import { expect } from 'chai';
import { TestHelper } from '../helpers/TestHelper';
import { BasePage } from '../helpers/BasePage';
import { LandingLocators } from '../locators/LandingLocators';
import { GuestUserLocators } from '../locators/GuestUserLocators';

export class GuestJourneySteps extends BasePage {

    constructor() {
        super('GuestJourneySteps');
    }

    /**
     * Reset app to initial state and navigate back to landing page
     * Uses inherited resetAppToLandingPage from BasePage
     */
    async resetToLandingPage(): Promise<void> {
        TestHelper.logStep('Resetting app to landing page');

        try {
            // Try to go back using device back button
            await driver.pressKeyCode(4); // Android back button
            await this.wait(1000);

            // If there's a popup, dismiss it
            try {
                await driver.pressKeyCode(4); // Back button again
                await this.wait(1000);
            } catch (e) {
                // No popup to dismiss
            }

            // Use inherited reset function from BasePage (uses constants)
            await this.resetAppToLandingPage();

            TestHelper.logSuccess('App reset to landing page successfully');
        } catch (error) {
            TestHelper.logStep('App reset failed, continuing with current state');
        }
    }

    /**
     * Verify the London Unlocked app landing page is loaded
     * This func can be moved to a separate class to maintain POM structure
     * Keep it here as just for reference as we have a few TC just for demo and I have focused more on framework architecture building
     */
    async givenUserIsOnLandingPage(): Promise<void> {
        TestHelper.logStep('Given user is on Landing Page');
        try {
            await this.waitForPageToLoad(LandingLocators.AUTOMATOR.WELCOME_TITLE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        } catch (error) {
            TestHelper.logStep('Landing page not found, resetting app...');
            await this.resetToLandingPage();
            await this.waitForPageToLoad(LandingLocators.AUTOMATOR.WELCOME_TITLE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        }

        await this.verifyElementIsDisplayed(LandingLocators.AUTOMATOR.GET_STARTED_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.verifyElementIsDisplayed(LandingLocators.AUTOMATOR.GUEST_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Landing Page is loaded successfully');
    }

    /**
     * Verify guest user page is displayed when continue as guest button is clicked
     */
    async verifyGuestScreenOnClickingContinueAsGuestButton(): Promise<void> {
        TestHelper.logStep('When user clicks on Continue as Guest button');
        await this.clickOnElement(LandingLocators.AUTOMATOR.GUEST_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.waitForPageToLoad(GuestUserLocators.AUTOMATOR.GUEST_USER_PAGE_TITLE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Guest user page is loaded successfully');
    }

    /**
     * User clicks on the locked content
     */
    async userClicksOnUnclockedContent(): Promise<void> {
        TestHelper.logStep('When user clicks on locked content');
        // Wait for locked section to be present and visible
        const lockedElement = await this.waitForElementToExist(GuestUserLocators.AUTOMATOR.LOCKED_SECTION, LandingLocators.LOCATOR_TYPES.AUTOMATOR, 5000);
        await lockedElement.waitForDisplayed({ timeout: 3000 });
        await this.clickOnElement(GuestUserLocators.AUTOMATOR.LOCKED_SECTION, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
    }

    /**
     * Verify the Login required popup is displayed
     */
    async userVerifyTheLogiRequiredPopupisDisplayed(): Promise<void> {
        TestHelper.logStep('Then login required popup should be displayed');
        await this.waitForPageToLoad(GuestUserLocators.AUTOMATOR.LOGIN_TO_UNLOCK_POPUP, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        const actualPopupTitle = await this.getText(GuestUserLocators.AUTOMATOR.LOGIN_TO_UNLOCK_POPUP, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        const expectedText = 'Login Required';
        expect(actualPopupTitle, `Popup title should contain "${expectedText}"`).to.contain(expectedText);
        TestHelper.logSuccess('The Login required popup is displayed successfully');
    }

    /**
     * Clean up after test - return to landing page for next test
     */
    async cleanupAfterTest(): Promise<void> {
        TestHelper.logStep('Cleaning up after test completion');

        try {
            // Use the enhanced cleanup method from BasePage
            await this.cleanupForNextTest();
            TestHelper.logSuccess('Test cleanup completed successfully');
        } catch (error) {
            TestHelper.logStep('Cleanup completed with warnings');
        }
    }

}
