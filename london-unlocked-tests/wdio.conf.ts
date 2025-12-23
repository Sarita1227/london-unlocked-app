// @ts-nocheck
// Register tsconfig paths for alias resolution
import 'tsconfig-paths/register';

import type { Options } from '@wdio/types';
import { config as sharedConfig } from './src/config/shared.config';
import { getCapabilities } from './src/config/capabilities.config';
import { ANDROID, TIMEOUTS, TEXTS } from './src/constants';
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
            outputDir: './reports/allure-results',
            disableWebdriverStepsReporting: true,
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
    onPrepare: function () {
        console.log('Starting Test Execution...');
        console.log('Target: London Unlocked APK');

        // Clean previous Allure results to avoid stale test names
        try {
            const fs = require('fs');
            const path = require('path');
            const resultsDir = path.join(process.cwd(), 'reports', 'allure-results');
            if (fs.existsSync(resultsDir)) {
                console.log(`Cleaning previous test results: ${resultsDir}`);
                fs.rmSync(resultsDir, { recursive: true, force: true });
            }
        } catch (e) {
            console.log('Warning: Unable to clean allure-results:', e.message);
        }
    },

    /**
     * Gets executed before a worker process is spawned
     */
    onWorkerStart: function (cid) {
        console.log(`Worker ${cid} starting...`);
    },

    /**
     * Gets executed when a worker process is spawned and a workerStart hook is executed
     */
    onWorkerEnd: function () {
        // Ensure proper cleanup of sessions
        console.log('Worker ended - cleaning up session');
    },

    /**
     * Gets executed before test execution begins
     */
    before: async function (capabilities, specs) {
        const chai = await import('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
        console.log('Test session initialized');
        console.log(`Platform: ${capabilities.platformName}`);
        console.log(`Running specs: ${specs.join(', ')}`);
    },

    /**
     * Gets executed before each test
     */
    beforeTest: async function (test) {
        console.log(`\nStarting: ${test.parent} - ${test.title}`);
    },

    /**
     * Gets executed after each test (IMPORTANT: Screenshot on failure!)
     */
    afterTest: async function (test, _context, { error, duration, passed }) {
        const testName = `${test.parent} - ${test.title}`;

        if (passed) {
            console.log(`PASSED: ${testName} (${duration}ms)`);
        } else {
            console.log(`FAILED: ${testName}`);
            console.log(`   Error: ${error?.message || 'Unknown error'}`);

            // Log stack trace if available
            if (error?.stack) {
                console.log(`   Stack trace: ${error.stack}`);
            }

            // Take screenshot on failure for Allure embedded screenshots
            try {
                const screenshot = await driver.takeScreenshot();

                // Import allure reporter dynamically to avoid issues if not available
                try {
                    const allure = await import('@wdio/allure-reporter').then(m => m.default);
                    allure.addAttachment('Screenshot on Failure', Buffer.from(screenshot, 'base64'), 'image/png');
                    console.log(`   Screenshot attached to Allure report`);
                } catch (allureError) {
                    console.log(`   Warning: Could not attach to Allure: ${allureError.message}`);
                    // Fallback: save to file
                    const fs = await import('fs');
                    const path = await import('path');
                    const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
                    if (!fs.existsSync(screenshotDir)) {
                        fs.mkdirSync(screenshotDir, { recursive: true });
                    }
                    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                    const fileName = `FAILED_${test.title.replace(/[^a-z0-9]/gi, '_')}_${timestamp}.png`;
                    const filePath = path.join(screenshotDir, fileName);
                    fs.writeFileSync(filePath, screenshot, 'base64');
                    console.log(`   Screenshot saved to file: ${fileName}`);
                }

            } catch (screenshotError) {
                console.error(`   Warning: Failed to capture screenshot: ${screenshotError.message}`);
            }
        }

        // IMPORTANT: Reset app to landing page after each test
        try {
            console.log('Resetting app to landing page for next test...');

            // Try to press back button to dismiss any popups
            await driver.pressKeyCode(4); // Android back button
            await driver.pause(1000);

            // Check if we're already on landing page
            try {
                const landingElement = await driver.$(`-android uiautomator:new UiSelector().text("${TEXTS.LANDING_TITLE}")`);
                if (await landingElement.isDisplayed()) {
                    console.log('Already on landing page - cleanup complete');
                    return;
                }
            } catch (e) {
                // Landing page not visible, need to reset
            }

            // Reset app to clean state
            await driver.terminateApp(ANDROID.PACKAGE_NAME, { timeout: TIMEOUTS.APP_TERMINATE });
            await driver.pause(TIMEOUTS.APP_RESTART_WAIT);
            await driver.activateApp(ANDROID.PACKAGE_NAME);
            await driver.pause(TIMEOUTS.APP_ACTIVATE_WAIT);

            console.log('App reset to landing page for next test');

        } catch (resetError) {
            console.log(`Warning: App reset failed: ${resetError.message}`);
            console.log('   Next test will handle app state verification');
        }
    },

    /**
     * Gets executed after all tests are done
     */
    after: function () {
        console.log('Test session completed');
    },

    /**
     * Gets executed after all workers got shut down and the process is about to exit
     */
    onComplete: async function() {
        console.log('All tests completed');
        console.log('Generating Allure HTML Report...');

        try {
            const { execSync } = await import('child_process');
            const fs = await import('fs');
            const path = await import('path');

            // Create timestamp for folder name
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T').join('_').substring(0, 19);
            const reportsBaseDir = path.join(process.cwd(), 'reports', 'html-reports');
            const timestampDir = path.join(reportsBaseDir, timestamp);

            // Create directory
            if (!fs.existsSync(timestampDir)) {
                fs.mkdirSync(timestampDir, { recursive: true });
            }

            // Generate beautiful Allure report
            const allureResultsDir = path.join(process.cwd(), 'reports', 'allure-results');
            if (fs.existsSync(allureResultsDir) && fs.readdirSync(allureResultsDir).length > 0) {
                const reportDir = path.join(timestampDir, 'LondonUnlocked_TestReport');

                console.log(`Generating HTML report...`);
                console.log(`Location: ${reportDir}`);

                // Generate Allure report with embedded screenshots
                execSync(`npx allure generate ${allureResultsDir} --clean -o "${reportDir}"`, { stdio: 'inherit' });

                // Rename index.html to include TestExecutionReport_<timestamp>.html
                try {
                    const indexPath = path.join(reportDir, 'index.html');
                    if (fs.existsSync(indexPath)) {
                        const newName = `TestExecutionReport_${timestamp}.html`;
                        const newPath = path.join(reportDir, newName);
                        fs.renameSync(indexPath, newPath);
                        console.log(`Report saved as: ${newName}`);
                    }
                } catch (renameErr) {
                    console.log('Warning: Could not rename index.html:', renameErr.message);
                }

                // Create latest symlink
                const latestLink = path.join(reportsBaseDir, 'latest');
                if (fs.existsSync(latestLink)) {
                    fs.unlinkSync(latestLink);
                }
                fs.symlinkSync(reportDir, latestLink);

                console.log('HTML Report Generated Successfully');
                console.log(`Open Report: ${reportDir}/TestExecutionReport_${timestamp}.html`);
                console.log(`Quick Access: ${latestLink}/TestExecutionReport_${timestamp}.html`);
                console.log('Screenshots are embedded in the report');

                // Try to open the report automatically (optional)
                try {
                    if (process.platform === 'darwin') {
                        execSync(`open "${reportDir}/TestExecutionReport_${timestamp}.html"`);
                        console.log('Report opened in browser');
                    }
                } catch (openError) {
                    // Silently fail - not critical
                }

            } else {
                console.log('Warning: No test results found to generate report');
            }
        } catch (error) {
            console.error('Error: Failed to generate HTML report:', error.message);
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

