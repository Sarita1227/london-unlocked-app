/**
 * LoginLocators - Login page element locators
 */

import { BaseLocators } from './BaseLocators';

export class LoginLocators extends BaseLocators {

    static readonly IDs = {
        EMAIL_INPUT: 'email-input',
        PASSWORD_INPUT: 'password-input',
        LOGIN_BUTTON: 'login-button',
        EMAIL_ERROR_MESSAGE: 'email-error',
        PASSWORD_ERROR_MESSAGE: 'password-error',
    };

    static readonly TEXTS = {
        LOGIN_IN_TITLE: 'Welcome Back',
        LOGIN_SUCCESS_MESSAGE: 'London Unlocked',
        LOGIN_PAGE_FIELD_TEXT: 'Festive Season Special',
    };

    static readonly LOCATOR_TYPES = {
        ID: 'id' as const,
        TEXT: 'uiautomator' as const,
    };
}

