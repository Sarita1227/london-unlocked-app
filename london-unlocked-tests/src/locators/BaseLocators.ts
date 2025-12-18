/**
 * BaseLocators - Platform-agnostic locator management
 * Automatically detects iOS vs Android and returns appropriate selectors
 */

export type Platform = 'ios' | 'android';

export interface Locator {
    ios: string;
    android: string;
}

export class BaseLocators {
    private static platform: Platform;

    /**
     * Get current platform from environment
     */
    static getPlatform(): Platform {
        if (!this.platform) {
            const envPlatform = process.env.PLATFORM?.toLowerCase();
            this.platform = (envPlatform === 'ios' ? 'ios' : 'android') as Platform;
        }
        return this.platform;
    }

    /**
     * Get platform-specific selector
     * @param locator - Object with ios and android selectors
     * @returns Platform-specific selector string
     */
    static getSelector(locator: Locator): string {
        const platform = this.getPlatform();
        return locator[platform];
    }

    /**
     * Create a locator object for both platforms
     */
    static create(ios: string, android: string): Locator {
        return { ios, android };
    }

    /**
     * Check if current platform is Android
     */
    static isAndroid(): boolean {
        return this.getPlatform() === 'android';
    }

    /**
     * Check if current platform is iOS
     */
    static isIOS(): boolean {
        return this.getPlatform() === 'ios';
    }


    /**
     * Get mobile element selector STRING
     *
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     * @returns Platform-specific selector STRING
     */
    static getMobileElement(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): string {
        let locator: Locator;

        switch (locatorType) {
            case 'id':
                locator = this.create(`~${value}`, `~${value}`);
                break;

            case 'uiautomator':
                locator = this.create(
                    `-ios predicate string:label == "${value}"`,
                    `android=new UiSelector().text("${value}")`
                );
                break;

            case 'accessibility':
                locator = this.create(
                    `~${value}`,
                    `android=new UiSelector().description("${value}")`
                );
                break;

            case 'className':
                locator = this.create(
                    `-ios class chain:**/${value}`,
                    `android=new UiSelector().className("${value}")`
                );
                break;

            case 'xpath':
                locator = this.create(
                    `//*[@label="${value}"]`,
                    `//*[@text="${value}"]`
                );
                break;

            default:
                locator = this.create(`~${value}`, `~${value}`);
        }

        return this.getSelector(locator);
    }

    /**
     * Find SINGLE element using getMobileElement selector
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     * @returns WebDriverIO Element
     */
    static async findElement(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'id'
    ): Promise<WebdriverIO.Element> {
        const selector = this.getMobileElement(value, locatorType);
        return await $(selector);
    }

    /**
     * Find MULTIPLE elements using getMobileElement selector
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     * @returns Array of WebDriverIO Elements
     */
    static async findElements(
        value: string,
        locatorType: 'id' | 'uiautomator' | 'accessibility' | 'className' | 'xpath' = 'className'
    ): Promise<WebdriverIO.ElementArray> {
        const selector = this.getMobileElement(value, locatorType);
        return await $$(selector);
    }

    /**
     * Get selector string for element that contains specific text (partial match)
     *
     * @param partialText - Text that element should contain
     * @returns Platform-specific selector STRING
     */
    static getElementContains(partialText: string): string {
        const locator = this.create(
            `-ios predicate string:label CONTAINS "${partialText}"`,
            `android=new UiSelector().textContains("${partialText}")`
        );
        return this.getSelector(locator);
    }

}

