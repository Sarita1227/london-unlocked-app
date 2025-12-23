/**
 * BasePage - Base class for all Page Objects
 **/

import { BaseLocators } from '../locators/BaseLocators';
import { logger } from './Logger';
import { ScreenshotHelper } from './ScreenshotHelper';
import { ANDROID, TIMEOUTS, TEXTS } from '../constants';
import {expect} from "chai";

export type LocatorType = 'id' | 'uiautomator' | 'accessibility' | 'xpath';

export abstract class BasePage {
    protected pageName: string;

    constructor(pageName: string) {
        this.pageName = pageName;
        logger.info(`${this.pageName} initialized`);
    }

    // ========== Helper Methods ==========

    // ========== Core Element Interactions ==========


    /**
     * Wait for element to exist (using Locator object)
     */
    protected async waitForElementToExist(
        value: string,
        locatorType: LocatorType = 'id',
        timeout: number = 5000
    ): Promise<WebdriverIO.Element> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.waitForExist({ timeout });
        logger.debug(`Element exists: ${value} (${locatorType})`);
        return element;
    }

    /**
     * Click on element (using Locator object)
     */
    protected async clickElement(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.click();
        logger.element('Click', `${value} (${locatorType})`);
    }

    /**
     * Set value in input field (using Locator object)
     */
    protected async setValue(
        value: string,
        textToEnter: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.clearValue();
        await element.setValue(textToEnter);
        logger.element(`Set value: "${textToEnter}"`, `${value} (${locatorType})`);
    }

    /**
     * Get text from element (using Locator object)
     */
    protected async getText(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<string> {
        try {
            const element = await BaseLocators.findElement(value, locatorType);
            const text = await element.getText();
            logger.element(`Get text: "${text}"`, `${value} (${locatorType})`);
            return text;
        } catch (error: any) {
            logger.warn(`Failed to get text from "${value}": ${error.message}`);
            return '';
        }
    }

    /**
     * Verify element is displayed
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     */
    async verifyElementIsDisplayed(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        try {
            const element = await BaseLocators.findElement(value, locatorType);
            const isDisplayed = await element.isDisplayed();
            expect(isDisplayed, `Element "${value}" should be displayed`).to.be.true;
            logger.success(`Element "${value}" is displayed`);
        } catch (error: any) {
            throw new Error(`Element "${value}" not found or not displayed`);
        }
    }

    /**
     * Verify element is enabled
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     */
    async verifyElementIsEnabled(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        const isEnabled = await element.isEnabled();

        expect(isEnabled, `Element "${value}" should be enabled`).to.be.true;
        logger.success(`Element "${value}" is enabled`);
    }

    /**
     * Scroll to element
     */
    protected async scrollToElement(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.scrollIntoView();
        logger.element('Scroll to', `${value} (${locatorType})`);
    }

    /**
     * Swipe action (mobile-specific)
     */
    protected async swipe(direction: 'up' | 'down' | 'left' | 'right'): Promise<void> {
        try {
            logger.element(`Swipe ${direction}`, 'screen');

            // Get screen dimensions
            const { width, height } = await driver.getWindowSize();

            // Calculate swipe coordinates
            const startX = width / 2;
            const startY = height / 2;
            let endX = startX;
            let endY = startY;

            switch (direction) {
                case 'up':
                    endY = height * 0.2;
                    break;
                case 'down':
                    endY = height * 0.8;
                    break;
                case 'left':
                    endX = width * 0.2;
                    break;
                case 'right':
                    endX = width * 0.8;
                    break;
            }

            // Perform swipe using touch action
            await driver.touchPerform([
                { action: 'press', options: { x: startX, y: startY } },
                { action: 'wait', options: { ms: 500 } },
                { action: 'moveTo', options: { x: endX, y: endY } },
                { action: 'release' }
            ]);
        } catch (error: any) {
            logger.error(`Failed to swipe ${direction}`, error);
            throw new Error(`Failed to swipe ${direction}: ${error.message}`);
        }
    }

    /**
     * Hide keyboard
     */
    protected async hideKeyboard(): Promise<void> {
        try {
            if (BaseLocators.isAndroid()) {
                await driver.hideKeyboard();
            } else {
                await driver.execute('mobile: hideKeyboard');
            }
            logger.debug('Keyboard hidden');
        } catch (error) {
            logger.warn('Failed to hide keyboard', error);
        }
    }

    /**
     * Take screenshot of current page
     */
    protected async takeScreenshot(name?: string): Promise<void> {
        const screenshotName = name || `${this.pageName}_${Date.now()}`;
        await ScreenshotHelper.takeAndAttach(screenshotName);
    }

    /**
     * Wait for specified milliseconds
     */
    protected async wait(milliseconds: number): Promise<void> {
        logger.debug(`Waiting ${milliseconds}ms`);
        await driver.pause(milliseconds);
    }

    /**
     * Log page interaction
     */
    protected logAction(action: string): void {
        logger.step(`[${this.pageName}] ${action}`);
    }

    /**
     * Wait for page to load using locator
     */
    async waitForPageToLoad(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        try {
            const element = await BaseLocators.findElement(value, locatorType);
            await element.waitForDisplayed({ timeout: 3000 }); // Reduced from 10000 to 3000
            logger.success(`Page loaded (locator: ${locatorType})`);
        } catch (error) {
            logger.warn(`Page load timeout for ${value} - continuing execution`);
        }
    }

    /**
     * Click on element using actual locator type with enhanced mobile support
     * @param value - The value to search for
     * @param locatorType - Actual locator
     */
    async clickOnElement(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        try {
            // Try tap via touchAction first (more reliable on some devices)
            await element.touchAction('tap');
            await this.wait(300);
            logger.success(`Tapped on "${value}" (locator: ${locatorType})`);
        } catch (tapError) {
            try {
                await element.click();
                logger.success(`Clicked on "${value}" (locator: ${locatorType})`);
            } catch (clickError) {
                logger.error(`Failed to click on element "${value}" (locator: ${locatorType})`, clickError);
                throw clickError;
            }
        }
    }

    /**
     * Set value in input field using actual locator type
     * @param value - The locator value to find the element
     * @param textToEnter - The text to enter in the field
     * @param locatorType - Actual locator type
     */
    async setValueInElement(
        value: string,
        textToEnter: string,
        locatorType: LocatorType = 'id'
    ): Promise<void> {
        try {
            const element = await BaseLocators.findElement(value, locatorType);
            await element.clearValue();
            await element.setValue(textToEnter);
            logger.success(`Entered text "${textToEnter}" in "${value}" (locator: ${locatorType})`);
        } catch (error: any) {
            throw new Error(`Failed to set value in element "${value}"`);
        }
    }


    /**
     * App Management Methods
     */

    /**
     * Reset app to landing screen by terminating and restarting
     * This ensures a clean state for the next test
     */
    protected async resetAppToLandingPage(): Promise<void> {
        try {
            logger.step('Resetting app to landing page...');

            // Terminate the app
            await driver.terminateApp(ANDROID.PACKAGE_NAME, { timeout: TIMEOUTS.APP_TERMINATE });
            await this.wait(TIMEOUTS.APP_RESTART_WAIT);

            // Restart the app
            await driver.activateApp(ANDROID.PACKAGE_NAME);
            await this.wait(TIMEOUTS.APP_ACTIVATE_WAIT);

            // Wait for landing page to load
            const landingTitleSelector = BaseLocators.getMobileElement(TEXTS.LANDING_TITLE, 'uiautomator');
            await $(landingTitleSelector).waitForDisplayed({ timeout: TIMEOUTS.LANDING_PAGE_LOAD });

            logger.success('App successfully reset to landing page');
        } catch (error: any) {
            logger.warn(`App reset failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Dismiss popups and navigate back to previous screens
     */
    protected async dismissPopupsAndNavigateBack(): Promise<void> {
        try {
            logger.step('Dismissing popups and navigating back...');

            // Try pressing back button multiple times to dismiss popups
            for (let i = 0; i < 3; i++) {
                await driver.pressKeyCode(4); // Android back button
                await this.wait(1000);
            }

            logger.success('Popups dismissed and navigation completed');
        } catch (error: any) {
            logger.warn(`Navigation back failed: ${error.message}`);
        }
    }

    /**
     * Cleanup method that combines popup dismissal and app reset
     * Use this in afterEach hooks to ensure clean state for next test
     */
    protected async cleanupForNextTest(): Promise<void> {
        try {
            logger.step('Starting test cleanup...');

            // First try to dismiss popups
            await this.dismissPopupsAndNavigateBack();

            // Check if we're already on landing page
            try {
                const landingTitleSelector = BaseLocators.getMobileElement('London Unlocked', 'uiautomator');
                const isOnLandingPage = await $(landingTitleSelector).isDisplayed();

                if (isOnLandingPage) {
                    logger.success('Already on landing page - cleanup complete');
                    return;
                }
            } catch (e) {
                // Not on landing page, need to reset
            }

            // Reset app if not on landing page
            await this.resetAppToLandingPage();

            logger.success('Test cleanup completed successfully');
        } catch (error: any) {
            logger.warn(`Test cleanup completed with warnings: ${error.message}`);
        }
    }
}
