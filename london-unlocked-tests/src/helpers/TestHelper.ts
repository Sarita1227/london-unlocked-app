import { logger } from './Logger';
import { ScreenshotHelper } from './ScreenshotHelper';

/**
 * TestHelper - Utility class for common test operations
 * Includes logging, screenshots, test data generation
 */
export class TestHelper {
    /**
     * Generate random email
     */
    static generateRandomEmail(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const email = `test.user.${timestamp}.${random}@londonunlocked.com`;
        logger.debug('Generated random email', email);
        return email;
    }

    /**
     * Generate random username
     */
    static generateRandomUsername(): string {
        const timestamp = Date.now();
        const username = `user_${timestamp}`;
        logger.debug('Generated random username', username);
        return username;
    }

    /**
     * Generate random password
     */
    static generateRandomPassword(length: number = 12): string {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        logger.debug('Generated random password');
        return password;
    }

    /**
     * Wait for specified milliseconds
     */
    static async wait(milliseconds: number): Promise<void> {
        logger.debug(`Waiting for ${milliseconds}ms`);
        await driver.pause(milliseconds);
    }

    /**
     * Get current timestamp
     */
    static getTimestamp(): string {
        return new Date().toISOString();
    }

    /**
     * Format date to readable string
     */
    static formatDate(date: Date = new Date()): string {
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Retry an action multiple times
     */
    static async retry<T>(
        action: () => Promise<T>,
        maxRetries: number = 3,
        delayMs: number = 1000
    ): Promise<T> {
        let lastError: Error;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                logger.debug(`Attempt ${attempt} of ${maxRetries}`);
                return await action();
            } catch (error) {
                lastError = error as Error;
                logger.warn(`Attempt ${attempt} failed: ${lastError.message}`);

                if (attempt < maxRetries) {
                    await this.wait(delayMs);
                }
            }
        }

        logger.error(`All ${maxRetries} attempts failed`, lastError!);
        throw lastError!;
    }

    /**
     * Take screenshot with logging and error handling
     */
    static async takeScreenshot(name?: string): Promise<void> {
        try {
            const screenshotName = name || 'default';
            logger.step(`Taking screenshot: ${screenshotName}`);
            await ScreenshotHelper.takeAndAttach(screenshotName);
        } catch (error) {
            logger.error('Failed to take screenshot', error);
            // Don't throw - screenshot failure shouldn't fail the test
        }
    }

    /**
     * Log test step
     */
    static logStep(stepDescription: string): void {
        logger.step(stepDescription);
    }

    static logInfo(infoDescription: string): void {
        logger.info(infoDescription);
    }

    static logSuccess(successDescription: string): void {
        logger.success(successDescription);
    }

    /**
     * Log assertion
     */
    static logAssertion(description: string, expected: unknown, actual: unknown): void {
        logger.assertion(description, expected, actual);
    }

    /**
     * Scroll to element
     */
    static async scrollToElement(element: WebdriverIO.Element): Promise<void> {
        try {
            const selector = await element.selector;
            logger.element('Scroll to', selector);
            await element.scrollIntoView();
        } catch (error) {
            logger.error('Failed to scroll to element', error);
            // @ts-expect-error - Error type checking
            throw new Error(`Failed to scroll to element: ${error.message}`);
        }
    }

    /**
     * Wait for element and log
     */
    static async waitForElement(
        element: WebdriverIO.Element,
        timeout: number = 10000
    ): Promise<void> {
        try {
            const selector = await element.selector;
            logger.element('Wait for', selector);
            await element.waitForDisplayed({ timeout });
        } catch (error) {
            const selector = await element.selector.catch(() => 'unknown');
            logger.error(`Failed to wait for element: ${selector}`, error);
            throw new Error(`Element not found after ${timeout}ms: ${selector}`);
        }
    }

    /**
     * Click element with logging and error handling
     */
    static async clickElement(element: WebdriverIO.Element): Promise<void> {
        try {
            await this.waitForElement(element);
            const selector = await element.selector;
            logger.element('Click', selector);
            await element.click();
        } catch (error) {
            const selector = await element.selector.catch(() => 'unknown');
            logger.error(`Failed to click element: ${selector}`, error);
            // Take screenshot on click failure
            await ScreenshotHelper.takeAndAttach('Click Failed').catch(() => {});
            // @ts-expect-error - Error type checking
            throw new Error(`Failed to click element: ${selector} - ${error.message}`);
        }
    }

    /**
     * Set value with logging and error handling
     */
    static async setValue(
        element: WebdriverIO.Element,
        value: string,
        maskValue: boolean = false
    ): Promise<void> {
        try {
            await this.waitForElement(element);
            const selector = await element.selector;
            const displayValue = maskValue ? '****' : value;
            logger.element(`Set value: ${displayValue}`, selector);
            await element.setValue(value);
        } catch (error) {
            const selector = await element.selector.catch(() => 'unknown');
            logger.error(`Failed to set value on element: ${selector}`, error);
            // @ts-expect-error - Error type checking
            throw new Error(`Failed to set value on element: ${selector} - ${error.message}`);
        }
    }

    /**
     * Get text with logging and error handling
     */
    static async getText(element: WebdriverIO.Element): Promise<string> {
        try {
            await this.waitForElement(element);
            const selector = await element.selector;
            const text = await element.getText();
            logger.element(`Get text: ${text}`, selector);
            return text;
        } catch (error) {
            const selector = await element.selector.catch(() => 'unknown');
            logger.error(`Failed to get text from element: ${selector}`, error);
            // @ts-expect-error - Error type checking
            throw new Error(`Failed to get text from element: ${selector} - ${error.message}`);
        }
    }

    /**
     * Check if element is displayed with logging (non-throwing)
     */
    static async isDisplayed(element: WebdriverIO.Element): Promise<boolean> {
        try {
            const selector = await element.selector;
            const displayed = await element.isDisplayed();
            logger.element(`Is displayed: ${displayed}`, selector);
            return displayed;
        } catch (error) {
            const selector = await element.selector.catch(() => 'unknown');
            logger.element('Is displayed: false (not found)', selector);
            return false;
        }
    }

    /**
     * Log navigation
     */
    static logNavigation(from: string, to: string): void {
        logger.navigation(from, to);
    }

    /**
     * Navigate back (device back button)
     */
    static async navigateBack(): Promise<void> {
        logger.step('Navigating back');
        await driver.back();
        await TestHelper.wait(500);
    }

}

// Export logger and screenshot helper for direct use
export { logger } from './Logger';
export { ScreenshotHelper } from './ScreenshotHelper';

