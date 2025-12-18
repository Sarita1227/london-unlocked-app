/**
 * GuestUserLocators - Guest User/Explore page element locators
 * Centralized element IDs and texts for guest user functionality
 */

import { BaseLocators } from './BaseLocators';

export class GuestUserLocators extends BaseLocators {

    static readonly IDs = {
        LOGIN_TO_UNLOCK_POPUP: 'com.anonymous.londonunlocked:id/parentPanel',
    };

    static readonly TEXTS = {
        GUEST_USER_PAGE_TITLE: 'Guest Mode - Limited Access',
        LOCKED_SECTION: 'Login to unlock full access',
    };

}

