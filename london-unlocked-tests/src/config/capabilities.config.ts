/**
 * Platform Capabilities Configuration
 * Flexible configuration for Android, iOS, and other platforms
 */

import * as path from 'path';
import { ANDROID, EXPO, IOS } from '../constants';

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
    [key: string]: unknown;
}

/**
 * Get Android capabilities
 */
export function getAndroidCapabilities(): PlatformCapabilities {
    const appPath = process.env.ANDROID_APP_PATH ||
                    path.join(__dirname, '../../apps/android/app-debug.apk');

    // Only use Expo Go if explicitly requested
    const useExpoGo = process.env.USE_EXPO_GO === 'true';
    const useInstalledApp = process.env.USE_INSTALLED_APP === 'true';

    let capabilities: PlatformCapabilities;

    if (useExpoGo) {
        // Use Expo Go app for development (only when explicitly requested)
        capabilities = {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': ANDROID.DEVICE_NAME,
            'appium:appPackage': EXPO.PACKAGE_NAME,
            'appium:appActivity': EXPO.ACTIVITY,
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:ensureWebviewsHavePages': true,
            'appium:nativeWebScreenshot': true,
            'appium:newCommandTimeout': 3600,
            'appium:connectHardwareKeyboard': true
        };
    } else {
        // Use standalone APK (default behavior)
        capabilities = {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': ANDROID.DEVICE_NAME,
            'appium:appPackage': ANDROID.PACKAGE_NAME,
            'appium:appActivity': ANDROID.MAIN_ACTIVITY,
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:ensureWebviewsHavePages': true,
            'appium:nativeWebScreenshot': true,
            'appium:newCommandTimeout': 3600,
            'appium:connectHardwareKeyboard': true
        };

        // Use APK file if not using pre-installed app
        if (!useInstalledApp) {
            // Check if APK exists, if not, provide helpful error message
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const fs = require('fs');
            if (!fs.existsSync(appPath)) {
                throw new Error(`APK file not found at: ${appPath}\n\nPlease:\n1. Build your APK using 'npm run build:android'\n2. Or set USE_INSTALLED_APP=true to use pre-installed app\n3. Or set USE_EXPO_GO=true to use Expo Go (development only)`);
            }
            capabilities['appium:app'] = appPath;
        }
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
        'appium:deviceName': process.env.IOS_DEVICE || IOS.DEVICE_NAME,
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
export function getBrowserStackCapabilities(platform: 'android' | 'ios'): PlatformCapabilities {
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


