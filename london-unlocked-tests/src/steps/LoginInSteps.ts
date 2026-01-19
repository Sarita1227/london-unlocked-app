import { TestHelper } from '../helpers/TestHelper';
import { BasePage } from '../helpers/BasePage';
import { LandingLocators } from '../locators/LandingLocators';
import {LoginLocators} from '../locators/LoginLocators';
import {expect} from 'chai';
import {BaseLocators} from '../locators/BaseLocators';

/**
 * Login Step Definitions
 * BDD steps for login functionality
 */
export class LoginInSteps extends BasePage {


    constructor() {
        super('LoginInSteps');
    }

    async userClickOnGetStartedButton(): Promise<void> {
        TestHelper.logStep('User clicks on Get Started button');
        await this.waitForPageToLoad(LandingLocators.AUTOMATOR.GET_STARTED_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.clickOnElement(LandingLocators.AUTOMATOR.GET_STARTED_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        await this.waitForPageToLoad(LoginLocators.AUTOMATOR.LOGIN_IN_TITLE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        TestHelper.logSuccess('Login Page is loaded');
    }

    async userEnterEmailAddress(value: string): Promise<void> {
        TestHelper.logStep('User enters email');
        await this.setValueInElement(LoginLocators.AUTOMATOR.EMAIL_INPUT, value, LandingLocators.LOCATOR_TYPES.AUTOMATOR);

    }

    async userEnterEmailPassword(value: string): Promise<void> {
        TestHelper.logStep('User enters password');
        await this.setValueInElement(LoginLocators.AUTOMATOR.PASSWORD_INPUT, value, LandingLocators.LOCATOR_TYPES.AUTOMATOR);

    }

    async userClicksOnLogin(): Promise<void> {
        TestHelper.logStep('User clicks on LoginBtn');
        await this.clickOnElement(LoginLocators.AUTOMATOR.LOGIN_BUTTON, LandingLocators.LOCATOR_TYPES.AUTOMATOR);

    }

    async userVerifyInvalidEmailErrorMessage(expectedMessage: string): Promise<void> {
        TestHelper.logStep('Verify invalid email error message');
        const actualErrorMessage = await this.getText(LoginLocators.AUTOMATOR.EMAIL_ERROR_MESSAGE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        expect(actualErrorMessage, `Error message should be "${expectedMessage}"`).to.equal(expectedMessage);
        TestHelper.logSuccess(`Error message verified: "${actualErrorMessage}"`);
    }

    async userVerifyInvalidPasswordErrorMessage(expectedMessage: string): Promise<void> {
        TestHelper.logStep('Verify invalid password error message');
        const actualErrorMessage = await this.getText(LoginLocators.AUTOMATOR.PASSWORD_ERROR_MESSAGE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);
        expect(actualErrorMessage, `Error message should be "${expectedMessage}"`).to.equal(expectedMessage);
        TestHelper.logSuccess(`Error message verified: "${actualErrorMessage}"`);
    }

    async userVerifyCredentialsError(fieldToCheck: string): Promise<void> {
        if(fieldToCheck === 'email') {
            await this.userVerifyInvalidEmailErrorMessage('Please enter a valid email (must contain @ and domain)');
        } else if(fieldToCheck === 'password') {
            await this.userVerifyInvalidPasswordErrorMessage('Password must be alphanumeric (letters and numbers)');
        } else if(fieldToCheck === 'both') {
            await this.userVerifyInvalidEmailErrorMessage('Email is required');
            await this.userVerifyInvalidPasswordErrorMessage('Password is required');
        }
    }

    async userShouldbeLoggedSuccessfully(): Promise<void> {
        TestHelper.logStep('User verifies login is successful');
        await this.waitForPageToLoad(LoginLocators.AUTOMATOR.LOGIN_SUCCESS_MESSAGE, LandingLocators.LOCATOR_TYPES.AUTOMATOR);

        const containsSelector = BaseLocators.getElementContains(LoginLocators.AUTOMATOR.LOGIN_PAGE_FIELD_TEXT);
        const el = await $(containsSelector);
        await el.waitForDisplayed({ timeout: 5000 });
        const actualText = await el.getText();

        expect(actualText, `Expected page to contain "${LoginLocators.AUTOMATOR.LOGIN_PAGE_FIELD_TEXT}"`).to.contain(LoginLocators.AUTOMATOR.LOGIN_PAGE_FIELD_TEXT);
        TestHelper.logSuccess('Login is successful - user is on home page');
    }
}
