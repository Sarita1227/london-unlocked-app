/**
 * Application Constants
 * Centralized configuration for app-specific values
 */

export const AppConstants = {
    // Android App Configuration
    ANDROID: {
        PACKAGE_NAME: 'com.anonymous.londonunlocked',
        MAIN_ACTIVITY: '.MainActivity',
        DEVICE_NAME: 'emulator-5554',
    },

    // iOS App Configuration (for future use)
    IOS: {
        BUNDLE_ID: 'com.anonymous.londonunlocked',
        DEVICE_NAME: 'iPhone 15',
    },

    // Expo Go Configuration
    EXPO: {
        PACKAGE_NAME: 'host.exp.exponent',
        ACTIVITY: '.experience.HomeActivity',
    },

    // App Timeouts (in milliseconds)
    TIMEOUTS: {
        APP_TERMINATE: 5000,
        APP_RESTART_WAIT: 2000,
        APP_ACTIVATE_WAIT: 3000,
        LANDING_PAGE_LOAD: 10000,
        DEFAULT_WAIT: 5000,
    },

    // App Text Constants
    TEXTS: {
        LANDING_TITLE: 'London Unlocked',
        LOGIN_REQUIRED_POPUP: 'Login Required',
    },

    // Resource IDs
    RESOURCE_IDS: {
        ALERT_TITLE: 'com.anonymous.londonunlocked:id/alert_title',
    },
} as const;

// Export individual sections for convenience
export const { ANDROID, IOS, EXPO, TIMEOUTS, TEXTS, RESOURCE_IDS } = AppConstants;

