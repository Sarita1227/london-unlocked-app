/**
 * Platform Capabilities Configuration
 * Flexible configuration for Android, iOS, and other platforms
 */

import * as path from 'path';

export interface PlatformCapabilities {
    platformName: string;
    'appium:platformVersion'?: string;
    'appium:deviceName': string;
    'appium:app'?: string;
    'appium:automationName': string;
    'appium:newCommandTimeout'?: number;
    'appium:autoGrantPermissions'?: boolean;
    'appium:noReset'?: boolean;
    'appium:fullReset'?: boolean;
    [key: string]: any;
}

/**
 * Get Android capabilities
 */
export function getAndroidCapabilities(): PlatformCapabilities {
    const appPath = process.env.ANDROID_APP_PATH ||
                    path.join(__dirname, '../../apps/android/app-debug.apk');

    // If USE_INSTALLED_APP is set, use the app that's already installed on device
    const useInstalledApp = process.env.USE_INSTALLED_APP === 'true';

    // Capabilities matching working Appium Inspector config
    const capabilities: PlatformCapabilities = {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': 'emulator-5554',
        'appium:appPackage': 'com.anonymous.londonunlocked',
        'appium:appActivity': '.MainActivity',
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:ensureWebviewsHavePages': true,
        'appium:nativeWebScreenshot': true,
        'appium:newCommandTimeout': 3600,
        'appium:connectHardwareKeyboard': true
    };

    // Use APK file if not using installed app
    if (!useInstalledApp) {
        capabilities['appium:app'] = appPath;
    }

    return capabilities;
}

/**
 * Get iOS capabilities
 */
export function getIosCapabilities(): PlatformCapabilities {
    const appPath = process.env.IOS_APP_PATH ||
                    path.join(__dirname, '../../apps/ios/LondonUnlocked.app');

    return {
        platformName: 'iOS',
        'appium:platformVersion': process.env.IOS_VERSION || '17.0',
        'appium:deviceName': process.env.IOS_DEVICE || 'iPhone 15',
        'appium:app': appPath,
        'appium:automationName': 'XCUITest',
        'appium:newCommandTimeout': 300000,
        'appium:autoAcceptAlerts': true,
        'appium:noReset': false,
        'appium:fullReset': false
    };
}

/**
 * Get BrowserStack capabilities (for cloud testing)
 */
export function getBrowserStackCapabilities(platform: 'android' | 'ios'): any {
    const commonCaps = {
        'bstack:options': {
            userName: process.env.BROWSERSTACK_USERNAME,
            accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
            projectName: 'London Unlocked',
            buildName: `Build - ${new Date().toISOString().split('T')[0]}`,
            sessionName: `Test - ${platform}`,
            local: false,
            debug: true,
            networkLogs: true
        }
    };

    if (platform === 'android') {
        return {
            ...commonCaps,
            platformName: 'Android',
            'appium:platformVersion': process.env.BS_ANDROID_VERSION || '13.0',
            'appium:deviceName': process.env.BS_ANDROID_DEVICE || 'Google Pixel 7',
            'appium:app': process.env.BS_APP_ID || 'bs://<app-id>',
            'appium:automationName': 'UiAutomator2'
        };
    } else {
        return {
            ...commonCaps,
            platformName: 'iOS',
            'appium:platformVersion': process.env.BS_IOS_VERSION || '17',
            'appium:deviceName': process.env.BS_IOS_DEVICE || 'iPhone 15',
            'appium:app': process.env.BS_APP_ID || 'bs://<app-id>',
            'appium:automationName': 'XCUITest'
        };
    }
}

/**
 * Get capabilities based on environment
 */
export function getCapabilities(): PlatformCapabilities {
    const platform = (process.env.PLATFORM || 'android').toLowerCase();
    const environment = (process.env.TEST_ENV || 'local').toLowerCase();

    // Cloud testing (BrowserStack)
    if (environment === 'browserstack' || environment === 'cloud') {
        return getBrowserStackCapabilities(platform as 'android' | 'ios');
    }

    // Local testing
    if (platform === 'ios') {
        return getIosCapabilities();
    }

    // Default to Android
    return getAndroidCapabilities();
}

/**
 * Get port based on platform
 */
export function getAppiumPort(): number {
    return parseInt(process.env.APPIUM_PORT || '4723', 10);
}

/**
 * Get Appium server URL
 */
export function getAppiumUrl(): string {
    const host = process.env.APPIUM_HOST || 'localhost';
    const port = getAppiumPort();
    return `http://${host}:${port}`;
}

