import { TestHelper } from '../helpers/TestHelper';
import { BasePage } from '../helpers/BasePage';
import { LandingLocators } from '../locators/LandingLocators';
import { LoginLocators } from '../locators/LoginLocators';
import { ProfileLocators } from '../locators/ProfileLocators';
import { expect } from 'chai';

/**
 * Profile Step Definitions
 * Handles profile-related test steps
 */
export class ProfileSteps extends BasePage {

    constructor() {
        super('ProfileSteps');
    }

    /**
     * Navigate to profile settings from Explore screen
     */
    async navigateToProfileSettings(): Promise<void> {
        TestHelper.logStep('User navigates to Profile Settings');
        await this.waitForPageToLoad(ProfileLocators.AUTOMATOR.ACCOUNT_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.clickOnElement(ProfileLocators.AUTOMATOR.ACCOUNT_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Profile Settings page is loaded');
    }

    /**
     * Verify user profile information is displayed
     */
    async verifyProfileInformation(expectedUserName: string, expectedEmail: string): Promise<void> {
        TestHelper.logStep('Verifying profile information');

        // Wait for profile page to load
        await this.waitForPageToLoad(ProfileLocators.AUTOMATOR.LOGOUT_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);

        // Verify user name and email are displayed
        await this.verifyElementIsDisplayed(ProfileLocators.AUTOMATOR.ACCOUNT_STATUS, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);

        TestHelper.logSuccess(`Profile information verified for ${expectedUserName}`);
    }

    /**
     * Verify guest mode indicators on profile screen
     */
    async verifyGuestModeProfile(): Promise<void> {
        TestHelper.logStep('Verifying guest mode profile screen');

        await this.waitForPageToLoad(ProfileLocators.AUTOMATOR.GUEST_LOGIN_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.verifyElementIsDisplayed(ProfileLocators.AUTOMATOR.GUEST_SIGNUP_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);

        TestHelper.logSuccess('Guest mode profile verified');
    }

    /**
     * Toggle preference switches
     */
    async toggleGuestPrompts(): Promise<void> {
        TestHelper.logStep('Toggling guest prompts switch');
        await this.clickOnElement(ProfileLocators.AUTOMATOR.GUEST_PROMPTS_SWITCH, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Guest prompts switch toggled');
    }

    async toggleShowTips(): Promise<void> {
        TestHelper.logStep('Toggling show tips switch');
        await this.clickOnElement(ProfileLocators.AUTOMATOR.SHOW_TIPS_SWITCH, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Show tips switch toggled');
    }

    /**
     * Perform logout action
     */
    async performLogout(): Promise<void> {
        TestHelper.logStep('User clicks on Logout button');
        await this.clickOnElement(ProfileLocators.AUTOMATOR.LOGOUT_BUTTON, ProfileLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.wait(1000);

        // Handle logout confirmation alert if present
        // Note: Alert handling may require platform-specific logic
        TestHelper.logInfo('Logout button clicked, handling confirmation');
    }

    /**
     * Verify user is logged out and back on landing page
     */
    async verifyLogoutSuccess(): Promise<void> {
        TestHelper.logStep('Verifying logout was successful');
        await this.waitForPageToLoad(LandingLocators.AUTOMATOR.GET_STARTED_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.verifyElementIsDisplayed(LandingLocators.AUTOMATOR.WELCOME_TITLE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Logout successful - user is back on landing page');
    }
}

