/**
 * LoginLocators - Login page element locators
 */

import { BaseLocators } from './BaseLocators';

export class LoginLocators extends BaseLocators {

    static readonly AUTOMATOR = {
        LOGIN_IN_TITLE: 'text:Welcome Back',
        LOGIN_SUCCESS_MESSAGE: 'text:London Unlocked',
        LOGIN_PAGE_FIELD_TEXT: 'Festive Season Special',
        EMAIL_INPUT: 'resource-id:email-input',
        PASSWORD_INPUT: 'resource-id:password-input',
        LOGIN_BUTTON: 'resource-id:login-button',
        EMAIL_ERROR_MESSAGE: 'resource-id:email-error',
        PASSWORD_ERROR_MESSAGE: 'resource-id:password-error'
    };

}

