import { logger } from './Logger';

/**
 * ScreenshotHelper - Simplified screenshot utility for HTML reporter
 * Screenshots are automatically embedded in HTML reports on test failure
 */
export class ScreenshotHelper {

    /**
     * Generate screenshot filename with timestamp
     */
    private static generateFileName(prefix: string = 'screenshot'): string {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        return `${prefix}_${timestamp}.png`;
    }

    /**
     * Take screenshot - HTML reporter will handle embedding automatically
     */
    static async takeScreenshot(fileName?: string): Promise<void> {
        try {
            const screenshotName = fileName || this.generateFileName();
            await driver.takeScreenshot();
            logger.screenshot(screenshotName, true);

            // HTML reporter automatically captures and embeds screenshots on failure

        } catch (error) {
            logger.error('Failed to take screenshot', error);
            throw error;
        }
    }

    /**
     * Take and attach screenshot for HTML reporter
     */
    static async takeAndAttach(testName: string): Promise<void> {
        try {
            const fileName = this.generateFileName(testName.replace(/[^a-z0-9]/gi, '_'));
            await this.takeScreenshot(fileName);
            logger.success('Screenshot captured for HTML report');
        } catch (error) {
            logger.warn('Failed to capture screenshot for HTML report', error);
        }
    }

    /**
     * Take screenshot on test failure - simplified for HTML reporter
     */
    static async captureFailure(testName: string): Promise<void> {
        try {
            const fileName = `FAILED_${testName.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}`;
            await this.takeScreenshot(fileName);
            logger.screenshot(`Failure screenshot: ${fileName}`, true);
        } catch (error) {
            logger.error('Failed to capture failure screenshot', error);
        }
    }
}
