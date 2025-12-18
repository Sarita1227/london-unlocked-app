import { expect } from 'chai';
import { TestHelper } from '../helpers/TestHelper';
import { BasePage } from '../helpers/BasePage';
import { LandingLocators } from '../locators/LandingLocators';
import { BaseLocators } from '../locators/BaseLocators';
import { GuestUserLocators } from '../locators/GuestUserLocators';

export class GuestJourneySteps extends BasePage {

    constructor() {
        super('GuestJourneySteps');
    }

    /**
     * Verify the London Unlocked app landing page is loaded
     * This func can be moved to a separate class to maintain POM structure
     * Keep it here as just for reference as we have a few TC just for demo and I have focused more on framework architecture building
     */
    async givenUserIsOnLandingPage(): Promise<void> {
        TestHelper.logStep('Given user is on Landing Page');
        await this.waitForPageToLoad(LandingLocators.TEXTS.WELCOME_TITLE, LandingLocators.LOCATOR_TYPES.TEXT);
        await this.verifyElementIsDisplayed(LandingLocators.IDs.GET_STARTED_BUTTON, LandingLocators.LOCATOR_TYPES.ID);
        await this.verifyElementIsDisplayed(LandingLocators.IDs.GUEST_BUTTON, LandingLocators.LOCATOR_TYPES.ID);
        TestHelper.logSuccess('Landing Page is loaded successfully');
    }

    /**
     * Verify guest user page is displayed when continue as guest button is clicked
     */
    async verifyGuestScreenOnClickingContinueAsGuestButton(): Promise<void> {
        TestHelper.logStep('When user clicks on Continue as Guest button');
        await this.clickOnElement(LandingLocators.IDs.GUEST_BUTTON, LandingLocators.LOCATOR_TYPES.ID);
        await this.waitForPageToLoad(GuestUserLocators.TEXTS.GUEST_USER_PAGE_TITLE, LandingLocators.LOCATOR_TYPES.TEXT);
        TestHelper.logSuccess('Guest user page is loaded successfully');
    }

    /**
     * User clicks on the locked content
     */
    async userClicksOnUnclockedContent(): Promise<void> {
        TestHelper.logStep('When user clicks on locked content');
        await this.clickOnElement(GuestUserLocators.TEXTS.LOCKED_SECTION, LandingLocators.LOCATOR_TYPES.TEXT);
    }

    /**
     * Verify the Login required popup is displayed
     */
    async userVerifyTheLogiRequiredPopupisDisplayed(): Promise<void> {
        TestHelper.logStep('Then login required popup should be displayed');
        await this.waitForPageToLoad(GuestUserLocators.IDs.LOGIN_TO_UNLOCK_POPUP, LandingLocators.LOCATOR_TYPES.ID);
        const popupHeaderSelector = BaseLocators.findElement(GuestUserLocators.IDs.LOGIN_TO_UNLOCK_POPUP, LandingLocators.LOCATOR_TYPES.ID);
        const expectedText = "Login Required";
        expect(popupHeaderSelector, `Title should contain "${expectedText}"`).to.be.true;
        TestHelper.logSuccess('The Login required popup is displayed successfully');

    }


}

