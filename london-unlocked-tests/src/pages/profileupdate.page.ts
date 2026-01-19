/**
 * ProfileUpdatePage - Page Object for Profile Settings Screen
 * Handles profile viewing, settings updates, and account actions
 */

import { BasePage } from '../helpers/BasePage';
import { ProfileLocators } from '../locators/ProfileLocators';
import { logger } from '../helpers/Logger';

class ProfileUpdatePage extends BasePage {
    constructor() {
        super('ProfileUpdatePage');
    }

    /**
     * Navigate to profile settings by clicking account button
     */
    async navigateToProfile(): Promise<void> {
        await this.clickOnElement(
            ProfileLocators.AUTOMATOR.ACCOUNT_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.step('Navigated to Profile Settings');
    }

    /**
     * Verify profile page is displayed
     */
    async waitForProfilePageLoad(): Promise<void> {
        await this.waitForPageToLoad(
            ProfileLocators.AUTOMATOR.LOGOUT_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.success('Profile page loaded successfully');
    }

    /**
     * Verify account status is displayed
     */
    async verifyAccountStatus(): Promise<void> {
        await this.verifyElementIsDisplayed(
            ProfileLocators.AUTOMATOR.ACCOUNT_STATUS,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.success('Account status verified');
    }

    /**
     * Toggle guest prompts switch
     */
    async toggleGuestPrompts(): Promise<void> {
        await this.clickOnElement(
            ProfileLocators.AUTOMATOR.GUEST_PROMPTS_SWITCH,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.step('Guest prompts toggled');
    }

    /**
     * Toggle show tips switch
     */
    async toggleShowTips(): Promise<void> {
        await this.clickOnElement(
            ProfileLocators.AUTOMATOR.SHOW_TIPS_SWITCH,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.step('Show tips toggled');
    }

    /**
     * Click logout button
     */
    async clickLogout(): Promise<void> {
        await this.clickOnElement(
            ProfileLocators.AUTOMATOR.LOGOUT_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.step('Logout button clicked');
    }

    /**
     * Verify guest mode profile elements
     */
    async verifyGuestProfile(): Promise<void> {
        await this.verifyElementIsDisplayed(
            ProfileLocators.AUTOMATOR.GUEST_LOGIN_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        await this.verifyElementIsDisplayed(
            ProfileLocators.AUTOMATOR.GUEST_SIGNUP_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.success('Guest profile verified');
    }
}

export default new ProfileUpdatePage();
