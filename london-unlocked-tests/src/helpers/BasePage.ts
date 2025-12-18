/**
 * BasePage - Base class for all Page Objects
 **/

import { BaseLocators } from '../locators/BaseLocators';
import { logger } from './Logger';
import { ScreenshotHelper } from './ScreenshotHelper';
import {expect} from "chai";

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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath',
        timeout: number = 10000
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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath'
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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath'
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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath'
    ): Promise<string> {
        const element = await BaseLocators.findElement(value, locatorType);
        const text = await element.getText();
        logger.element(`Get text: "${text}"`, `${value} (${locatorType})`);
        return text;
    }

    /**
     * Verify element is displayed
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     */
    async verifyElementIsDisplayed(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        const isDisplayed = await element.isDisplayed();

        expect(isDisplayed, `Element "${value}" should be displayed`).to.be.true;
        logger.success(`✅ Element "${value}" is displayed`);
    }

    /**
     * Verify element is enabled
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     */
    async verifyElementIsEnabled(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        const isEnabled = await element.isEnabled();

        expect(isEnabled, `Element "${value}" should be enabled`).to.be.true;
        logger.success(`✅ Element "${value}" is enabled`);
    }

    /**
     * Scroll to element
     */
    protected async scrollToElement(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath'
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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.waitForDisplayed({ timeout: 10000 });
        logger.success(`Page loaded (locator: ${locatorType})`);
    }

    /**
     * Click on element using actual locator type
     * @param value - The value to search for
     * @param locatorType - Actual locator
     */
    async clickOnElement(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.click();
        logger.success(`Clicked on "${value}" (locator: ${locatorType})`);
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
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<void> {
        const element = await BaseLocators.findElement(value, locatorType);
        await element.clearValue();
        await element.setValue(textToEnter);
        logger.success(`Entered text "${textToEnter}" in "${value}" (locator: ${locatorType})`);
    }


}

