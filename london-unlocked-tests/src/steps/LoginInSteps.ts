import { TestHelper } from '../helpers/TestHelper';
import { BasePage } from '../helpers/BasePage';
import { LandingLocators } from '../locators/LandingLocators';
import {LoginLocators} from "../locators/LoginLocators";
import {expect} from "chai";
import {BaseLocators} from "../locators/BaseLocators";

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
        await this.clickOnElement(LandingLocators.TEXTS.GET_STARTED, LandingLocators.LOCATOR_TYPES.TEXT);
        await this.waitForPageToLoad(LoginLocators.TEXTS.LOGIN_IN_TITLE, LoginLocators.LOCATOR_TYPES.TEXT);
        TestHelper.logSuccess('Login Page is loaded');
    }

    async userEnterEmailAddress(value: string): Promise<void> {
        TestHelper.logStep(`User enters email`);
        await this.setValueInElement(LoginLocators.IDs.EMAIL_INPUT, value, LoginLocators.LOCATOR_TYPES.ID);

    }

    async userEnterEmailPassword(value: string): Promise<void> {
        TestHelper.logStep(`User enters password`);
        await this.setValueInElement(LoginLocators.IDs.PASSWORD_INPUT, value, LoginLocators.LOCATOR_TYPES.ID);

    }

    async userClicksOnLogin(): Promise<void> {
        TestHelper.logStep(`User clicks on LoginBtn`);
        await this.clickOnElement(LoginLocators.IDs.LOGIN_BUTTON, LoginLocators.LOCATOR_TYPES.ID);

    }

    async userVerifyInvalidEmailErrorMessage(expectedMessage: string): Promise<void> {
        TestHelper.logStep(`Verify invalid email error message`);
        const actualErrorMessage = await this.getText(LoginLocators.IDs.EMAIL_ERROR_MESSAGE, LoginLocators.LOCATOR_TYPES.ID);
        expect(actualErrorMessage, `Error message should be "${expectedMessage}"`).to.equal(expectedMessage);
        TestHelper.logSuccess(`Error message verified: "${actualErrorMessage}"`);
    }

    async userVerifyInvalidPasswordErrorMessage(expectedMessage: string): Promise<void> {
        TestHelper.logStep(`Verify invalid password error message`);
        const actualErrorMessage = await this.getText(LoginLocators.IDs.PASSWORD_ERROR_MESSAGE, LoginLocators.LOCATOR_TYPES.ID);
        expect(actualErrorMessage, `Error message should be "${expectedMessage}"`).to.equal(expectedMessage);
        TestHelper.logSuccess(`Error message verified: "${actualErrorMessage}"`);
    }

    async userVerifyCredentialsError(fieldToCheck: string): Promise<void> {
        if(fieldToCheck === 'email') {
            await this.userVerifyInvalidEmailErrorMessage('Please enter a valid email (must contain @ and domain)');
        } else if(fieldToCheck === 'password') {
            await this.userVerifyInvalidPasswordErrorMessage('Password must be alphanumeric (letters and numbers)');
        } else if(fieldToCheck === 'both') {
            await this.userVerifyInvalidEmailErrorMessage('Email is required.');
            await this.userVerifyInvalidPasswordErrorMessage('Password is required.');
        }
    }

    async userShouldbeLoggedSuccessfully(): Promise<void> {
        TestHelper.logStep('User verifies login is successful');
        await this.waitForPageToLoad(LoginLocators.TEXTS.LOGIN_SUCCESS_MESSAGE, LoginLocators.LOCATOR_TYPES.TEXT);

        expect(BaseLocators.getElementContains(LoginLocators.TEXTS.LOGIN_PAGE_FIELD_TEXT)).to.be.true;
        TestHelper.logSuccess('Login is successful - user is on home page');
    }
}
