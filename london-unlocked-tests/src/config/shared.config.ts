import type { Options } from '@wdio/types';

/**
 * Shared WebDriverIO Configuration
 * Contains base configs that are common across all test runs
 */
export const config: Partial<Options.Testrunner> = {
    // Runner type
    runner: 'local',


    // Appium Service - Disabled (start manually to avoid port conflicts)
    // Run: appium --address 127.0.0.1 --port 4723 --relaxed-security --allow-insecure adb_shell
    services: [],

    // Maximum parallel test instances
    maxInstances: 1
};

