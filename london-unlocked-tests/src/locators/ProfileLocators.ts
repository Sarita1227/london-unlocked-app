/**
 * ProfileLocators - Profile Settings page element locators
 */

import { BaseLocators } from './BaseLocators';

export class ProfileLocators extends BaseLocators {

    static readonly AUTOMATOR = {
        // Profile screen header elements
        PROFILE_TITLE: 'text:Profile',
        ACCOUNT_BUTTON: 'resource-id:account-button',

        // Profile information elements
        USER_NAME_DISPLAY: 'text:testuser',
        USER_EMAIL_DISPLAY: 'text:test.user@londonunlocked.com',

        // Settings switches
        GUEST_PROMPTS_SWITCH: 'resource-id:guest-prompts-switch',
        SHOW_TIPS_SWITCH: 'resource-id:show-tips-switch',

        // Account action buttons
        LOGOUT_BUTTON: 'resource-id:logout-button',
        DELETE_ACCOUNT_BUTTON: 'resource-id:delete-account-button',

        // Guest state elements
        GUEST_LOGIN_BUTTON: 'resource-id:guest-login-button',
        GUEST_SIGNUP_BUTTON: 'resource-id:guest-signup-button',

        // Text elements for verification
        ACCOUNT_STATUS: 'text:Active',
        GUEST_MODE_TEXT: 'text:Guest Mode - Limited Access',
    };

    static readonly LOCATOR_TYPES = {
        ID: 'accessibility' as const,
        AUTOMATOR: 'uiautomator' as const,
    };
}

