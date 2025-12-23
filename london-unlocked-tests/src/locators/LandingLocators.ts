/**
 * LandingLocators - Welcome page element locators
 */

import { BaseLocators } from './BaseLocators';

export class LandingLocators extends BaseLocators {

    static readonly AUTOMATOR = {
        WELCOME_TITLE: 'text:London Unlocked',
        GET_STARTED_BUTTON: 'resource-id:get-started-button',
        GUEST_BUTTON: 'resource-id:continue-as-guest-button',
    };

    static readonly LOCATOR_TYPES = {
        ID: 'accessibility' as const,
        AUTOMATOR: 'uiautomator' as const,
    };
}

