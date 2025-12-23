/**
 * GuestUserLocators - Guest User/Explore page element locators
 * Centralized element IDs and texts for guest user functionality
 */

import { BaseLocators } from './BaseLocators';
import { RESOURCE_IDS } from '../constants';

export class GuestUserLocators extends BaseLocators {

    static readonly AUTOMATOR = {
        LOGIN_TO_UNLOCK_POPUP: `resource-id:${RESOURCE_IDS.ALERT_TITLE}`,
        GUEST_USER_PAGE_TITLE: 'text:Guest Mode - Limited Access',
        LOCKED_SECTION: 'text:Indian Restaurants in London',
    };

}
