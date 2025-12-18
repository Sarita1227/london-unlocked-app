// @ts-nocheck
// Register tsconfig paths for alias resolution
import 'tsconfig-paths/register';

import type { Options } from '@wdio/types';
import { config as sharedConfig } from './src/config/shared.config';
import { getCapabilities } from './src/config/capabilities.config';
import { config as dotenvConfig } from 'dotenv';

// Load platform configuration from .env.platform
dotenvConfig({ path: '.env.platform' });

export const config: Options.Testrunner = {
    ...sharedConfig,

    //
    // ==================
    // Test Configurations
    // ==================
    //
    specs: [
        './src/tests/**/*.test.ts'
    ],

    // Patterns to exclude
    exclude: [],

    //
    // ============
    // Capabilities (Flexible - No Hardcoding!)
    // ============
    // Supports: Android, iOS, BrowserStack
    // Configure via .env.platform file or environment variables
    //
    capabilities: [getCapabilities()],

    //
    // ===================
    // Appium Server URL (Flexible)
    // ===================
    //
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT || '4723', 10),
    path: '/',

    //
    // ===================
    // Test Configurations
    // ===================
    //
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //
    // Framework Configuration
    //
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'reports/allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false
        }]
    ],

    //
    // Mocha Configuration
    //
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        // Tag-based filtering using grep
        // Use: npm test -- --mochaOpts.grep "@sanity"
        grep: process.env.TEST_TAG ? `@${process.env.TEST_TAG}` : undefined
    },

    //
    // =====
    // Hooks
    // =====
    //
    /**
     * Gets executed once before all workers get launched.
     */
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Test Execution...');
    },

    /**
     * Gets executed before a worker process is spawned
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
        console.log(`Worker ${cid} starting...`);
    },

    /**
     * Gets executed before test execution begins
     */
    before: async function (capabilities, specs) {
        const chai = await import('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        console.log('✅ Test session initialized');
        console.log(`📱 Platform: ${capabilities.platformName}`);
        console.log(`📂 Running specs: ${specs.join(', ')}`);
    },

    /**
     * Gets executed before each test
     */
    beforeTest: async function (test, context) {
        console.log(`\n▶️  Starting: ${test.parent} - ${test.title}`);
    },

    /**
     * Gets executed after each test (IMPORTANT: Screenshot on failure!)
     */
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        const testName = `${test.parent} - ${test.title}`;

        if (passed) {
            console.log(`✅ PASSED: ${testName} (${duration}ms)`);
        } else {
            console.log(`❌ FAILED: ${testName}`);
            console.log(`   Error: ${error?.message || 'Unknown error'}`);

            // Log stack trace if available
            if (error?.stack) {
                console.log(`   Stack trace: ${error.stack}`);
            }

            // Take screenshot on failure with comprehensive error handling
            let screenshotSaved = false;
            let allureAttached = false;

            try {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `FAILED_${test.parent.replace(/\s+/g, '_')}_${test.title.replace(/\s+/g, '_')}_${timestamp}.png`;

                // Capture screenshot
                const screenshot = await driver.takeScreenshot();

                // Save screenshot to file system
                try {
                    const fs = await import('fs');
                    const path = await import('path');
                    const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');

                    if (!fs.existsSync(screenshotDir)) {
                        fs.mkdirSync(screenshotDir, { recursive: true });
                    }

                    const screenshotPath = path.join(screenshotDir, fileName);
                    fs.writeFileSync(screenshotPath, screenshot, 'base64');
                    screenshotSaved = true;
                    console.log(`   📸 Screenshot saved: ${fileName}`);
                } catch (fileError) {
                    console.error(`   ⚠️  Failed to save screenshot to file: ${fileError.message}`);
                }

                // Attach to Allure report
                try {
                    const allure = await import('@wdio/allure-reporter').then(m => m.default);
                    allure.addAttachment('❌ Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
                    allureAttached = true;
                    console.log(`   ✅ Screenshot attached to Allure report`);
                } catch (allureError) {
                    console.error(`   ⚠️  Failed to attach screenshot to Allure: ${allureError.message}`);
                }

            } catch (screenshotError) {
                console.error(`   ⚠️  Failed to capture screenshot: ${screenshotError.message}`);
                if (screenshotError.stack) {
                    console.error(`   Stack: ${screenshotError.stack}`);
                }
            }

            // Summary
            if (!screenshotSaved && !allureAttached) {
                console.error(`   ❌ Screenshot capture completely failed`);
            }
        }
    },

    /**
     * Gets executed after all tests are done
     */
    after: function (result, capabilities, specs) {
        console.log('🏁 Test session completed');
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit
     */
    onComplete: async function(exitCode, config, capabilities, results) {
        console.log('✅ All tests completed!');
        console.log('📊 Generating Allure HTML Report...');

        // Auto-generate HTML report with timestamp
        const { execSync } = await import('child_process');
        const fs = await import('fs');
        const path = await import('path');

        try {
            // Create timestamp for folder name
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').substring(0, 19);
            const reportsBaseDir = path.join(process.cwd(), 'reports', 'html-reports');
            const timestampDir = path.join(reportsBaseDir, timestamp);

            // Create directory
            if (!fs.existsSync(timestampDir)) {
                fs.mkdirSync(timestampDir, { recursive: true });
            }

            // Find next available report number
            let reportNumber = 1;
            let reportDir = path.join(timestampDir, `Test_AutoReport${reportNumber}`);
            while (fs.existsSync(reportDir)) {
                reportNumber++;
                reportDir = path.join(timestampDir, `Test_AutoReport${reportNumber}`);
            }

            console.log(`📁 Generating report: Test_AutoReport${reportNumber}`);
            console.log(`📂 Location: ${reportDir}`);

            // Generate Allure report
            const allureResultsDir = path.join(process.cwd(), 'reports', 'allure-results');
            if (fs.existsSync(allureResultsDir) && fs.readdirSync(allureResultsDir).length > 0) {
                execSync(`allure generate ${allureResultsDir} --clean -o "${reportDir}"`, { stdio: 'inherit' });

                // Create latest symlink
                const latestLink = path.join(reportsBaseDir, 'latest');
                if (fs.existsSync(latestLink)) {
                    fs.unlinkSync(latestLink);
                }
                fs.symlinkSync(reportDir, latestLink);

                console.log('✅ HTML Report generated successfully!');
                console.log(`🌐 Open: ${reportDir}/index.html`);
                console.log(`🔗 Or open latest: ${latestLink}/index.html`);
            } else {
                console.log('⚠️  No test results found to generate report');
            }
        } catch (error) {
            console.error('❌ Failed to generate HTML report:', error.message);
        }
    },

    //
    // Test Suites
    //
    suites: {
        smoke: [
            './src/tests/auth/guestUserJourney.test.ts',
            './src/tests/auth/login.test.ts',
            './src/tests/explore/explore.test.ts'
        ],
        regression: [
            './src/tests/**/*.test.ts'
        ],
        auth: [
            './src/tests/auth/*.test.ts'
        ],
        explore: [
            './src/tests/explore/*.test.ts'
        ],
        e2e: [
            './src/tests/e2e/*.test.ts'
        ]
    }
};

