import * as fs from 'fs';
import * as path from 'path';
import allureReporter from '@wdio/allure-reporter';
import { logger } from './Logger';

/**
 * ScreenshotHelper - Captures and manages screenshots with Allure integration
 */
export class ScreenshotHelper {
    private static screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');

    /**
     * Initialize screenshot directory
     */
    static initialize(): void {
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
            logger.info(`Screenshot directory created: ${this.screenshotDir}`);
        }
    }

    /**
     * Generate screenshot filename
     */
    private static generateFileName(prefix: string = 'screenshot'): string {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        return `${prefix}_${timestamp}.png`;
    }

    /**
     * Take screenshot and save to file
     */
    static async takeScreenshot(fileName?: string): Promise<string> {
        try {
            this.initialize();

            const screenshotName = fileName || this.generateFileName();
            const screenshot = await driver.takeScreenshot();
            const screenshotPath = path.join(this.screenshotDir, screenshotName);

            fs.writeFileSync(screenshotPath, screenshot, 'base64');
            logger.screenshot(screenshotName, true);

            return screenshotPath;
        } catch (error) {
            logger.error('Failed to take screenshot', error);
            throw error;
        }
    }

    /**
     * Take screenshot and attach to Allure report
     */
    static async takeAndAttach(
        name: string = 'Screenshot',
        attachmentType: 'image/png' | 'image/jpeg' = 'image/png'
    ): Promise<void> {
        try {
            this.initialize();

            const screenshot = await driver.takeScreenshot();
            const buffer = Buffer.from(screenshot, 'base64');

            // Attach to Allure with error handling
            try {
                allureReporter.addAttachment(name, buffer, attachmentType);
            } catch (allureError) {
                logger.warn('Failed to attach screenshot to Allure report', allureError);
                // Continue to save file even if Allure fails
            }

            // Also save to file for backup
            try {
                const fileName = this.generateFileName(name.replace(/\s+/g, '_'));
                const screenshotPath = path.join(this.screenshotDir, fileName);
                fs.writeFileSync(screenshotPath, screenshot, 'base64');
                logger.screenshot(fileName, true);
            } catch (fileError) {
                logger.warn('Failed to save screenshot to file', fileError);
            }
        } catch (error) {
            logger.error('Failed to take screenshot', error);
            // Don't throw - screenshot failure should not break tests
        }
    }

    /**
     * Take screenshot on test failure (to be called in afterTest hook)
     */
    static async captureFailure(testName: string): Promise<void> {
        try {
            this.initialize();

            const fileName = `FAILED_${testName.replace(/\s+/g, '_')}_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
            const screenshot = await driver.takeScreenshot();
            const screenshotPath = path.join(this.screenshotDir, fileName);

            // Save to file
            fs.writeFileSync(screenshotPath, screenshot, 'base64');

            // Attach to Allure with red border effect
            const buffer = Buffer.from(screenshot, 'base64');
            allureReporter.addAttachment('❌ Failure Screenshot', buffer, 'image/png');

            logger.screenshot(fileName, true);
        } catch (error) {
            logger.error('Failed to capture failure screenshot', error);
        }
    }

    /**
     * Take screenshot with custom name
     */
    static async capture(name: string): Promise<string> {
        const fileName = `${name.replace(/\s+/g, '_')}_${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
        return await this.takeScreenshot(fileName);
    }

    /**
     * Take screenshot of specific element
     */
    static async captureElement(element: WebdriverIO.Element, name: string = 'element'): Promise<void> {
        try {
            const screenshot = await element.saveScreenshot(
                path.join(this.screenshotDir, this.generateFileName(name))
            );
            logger.screenshot(`${name} element`, true);
        } catch (error) {
            logger.error('Failed to capture element screenshot', error);
        }
    }

    /**
     * Clean old screenshots with comprehensive error handling
     */
    static cleanOldScreenshots(daysOld: number = 7): void {
        try {
            // Check if directory exists
            if (!fs.existsSync(this.screenshotDir)) {
                logger.info('Screenshot directory does not exist, nothing to clean');
                return;
            }

            const files = fs.readdirSync(this.screenshotDir);
            const now = Date.now();
            const maxAge = daysOld * 24 * 60 * 60 * 1000;

            let deletedCount = 0;
            let errorCount = 0;

            files.forEach(file => {
                try {
                    const filePath = path.join(this.screenshotDir, file);

                    // Skip if not a file
                    const stats = fs.statSync(filePath);
                    if (!stats.isFile()) {
                        return;
                    }

                    const age = now - stats.mtimeMs;

                    if (age > maxAge) {
                        fs.unlinkSync(filePath);
                        deletedCount++;
                    }
                } catch (fileError) {
                    errorCount++;
                    logger.warn(`Failed to delete file: ${file}`, fileError);
                }
            });

            if (deletedCount > 0) {
                logger.info(`Cleaned ${deletedCount} old screenshots (${errorCount} errors)`);
            }
        } catch (error) {
            logger.error('Failed to clean old screenshots', error);
            // Don't throw - cleanup failure shouldn't break tests
        }
    }

    /**
     * Get screenshot directory path
     */
    static getScreenshotDirectory(): string {
        return this.screenshotDir;
    }
}

