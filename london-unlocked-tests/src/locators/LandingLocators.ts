/**
 * LandingLocators - Welcome page element locators
 */

import { BaseLocators } from './BaseLocators';

export class LandingLocators extends BaseLocators {

    // ========== Element IDs (testID from React Native) ==========
    static readonly IDs = {
        GET_STARTED_BUTTON: 'get-started-button',
        GUEST_BUTTON: 'continue-as-guest-button',
    };

    // ========== Element Texts (for text-based verification) ==========
    static readonly TEXTS = {
        WELCOME_TITLE: 'London Unlocked',
        GET_STARTED: 'Get Started',
        TAGLINE: 'Discover London\'s Hidden Gems',
    };

    // ========== Locator Types (Constants) ==========
    static readonly LOCATOR_TYPES = {
        ID: 'id' as const,
        TEXT: 'uiautomator' as const,
    };
}

