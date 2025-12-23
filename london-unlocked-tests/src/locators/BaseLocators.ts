/**
 * BaseLocators - Platform-agnostic locator management
 * Automatically detects iOS vs Android and returns appropriate selectors
 */

export type Platform = 'ios' | 'android';
export type LocatorType = 'id' | 'uiautomator' | 'accessibility' | 'xpath';


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
        locatorType: LocatorType = 'id'
    ): string {
        switch (locatorType) {
            case 'id':
                return `id:${value}`;

            case 'accessibility':
                return `~${value}`;

            case 'uiautomator':
                if (this.isAndroid()) {
                    const androidSelector = this.parseAndroidUiSelector(value);
                    return `android=${androidSelector}`;
                }
                return this.parseIOSPredicate(value);

            case 'xpath':
                return this.isAndroid()
                    ? `//*[@resource-id="${value}"]`
                    : `//*[@label="${value}"]`;
        }
    }

    /**
     * Find SINGLE element using getMobileElement selector
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     * @returns WebDriverIO Element
     */
    static async findElement(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<WebdriverIO.Element> {
        const selector = this.getMobileElement(value, locatorType);
        return $(selector);
    }

    /**
     * Find MULTIPLE elements using getMobileElement selector
     * @param value - The value to search for
     * @param locatorType - Actual locator type
     * @returns Array of WebDriverIO Elements
     */
    static async findElements(
        value: string,
        locatorType: LocatorType = 'id'
    ): Promise<WebdriverIO.ElementArray> {
        const selector = this.getMobileElement(value, locatorType);
        return $$(selector);
    }

    /**
     * Get selector string for element that contains specific text (partial match)
     *
     * @param partialText - Text that element should contain
     * @returns Platform-specific selector STRING
     */
    static getElementContains(partialText: string): string {
        const escaped = partialText.replace(/"/g, '\\"');
        if (this.isAndroid()) {
            // use textContains for partial match on Android
            const locator = `new UiSelector().textContains("${escaped}")`;
            return `android=${locator}`;
        } else {
            // use CONTAINS[c] for case-insensitive contains on iOS
            const predicate = `label CONTAINS[c] "${escaped}"`;
            return `-ios predicate string:${predicate}`;
        }
    }


    /**
     * Parse Android UiSelector fields
     */
    private static parseAndroidUiSelector(fields: string): string {
        // If it's already a complete UiSelector, return as-is
        if (fields.startsWith('new UiSelector()')) {
            return fields;
        }

        if (fields.includes(':')) {
            const colonIndex = fields.indexOf(':');
            const prefix = fields.substring(0, colonIndex).toLowerCase().trim();
            const value = fields.substring(colonIndex + 1).trim();

            if (value) {
                switch (prefix) {
                    case 'resource-id':
                    case 'resourceid':
                    case 'id':
                        return `new UiSelector().resourceId("${value}")`;
                    case 'text':
                        return `new UiSelector().text("${value}")`;
                    case 'description':
                    case 'desc':
                        return `new UiSelector().description("${value}")`;
                    case 'class':
                    case 'classname':
                        return `new UiSelector().className("${value}")`;
                    case 'package':
                    case 'packagename':
                        return `new UiSelector().packageName("${value}")`;
                    case 'index':
                        return `new UiSelector().index(${parseInt(value)})`;
                    case 'instance':
                        return `new UiSelector().instance(${parseInt(value)})`;
                    default:
                        // Default to text search if prefix is unknown
                        return `new UiSelector().text("${value}")`;
                }
            }
        }

        // Handle pipe-separated format like 'resourceid:value|text:other'
        if (fields.includes('|')) {
            return fields.split('|').reduce((selector, field) => {
                const [key, val] = field.split(':');
                if (!val) return selector;

                const method = key.toLowerCase().trim();
                switch (method) {
                    case 'classname':
                    case 'class':
                        return `${selector}.className("${val}")`;
                    case 'resourceid':
                    case 'id':
                    case 'resource-id':
                        return `${selector}.resourceId("${val}")`;
                    case 'text':
                        return `${selector}.text("${val}")`;
                    case 'description':
                    case 'desc':
                        return `${selector}.description("${val}")`;
                    case 'instance':
                        return `${selector}.instance(${parseInt(val)})`;
                    case 'index':
                        return `${selector}.index(${parseInt(val)})`;
                    default:
                        return selector;
                }
            }, 'new UiSelector()');
        }

        // If no special format detected, treat as plain text
        return `new UiSelector().text("${fields}")`;
    }

    /**
     * Parse iOS Predicate fields → "label == 'x' AND name == 'y'"
     */
    private static parseIOSPredicate(fields: string): string {
        if (fields.startsWith('-ios predicate')) {
            return fields;
        }

        const predicate = fields.split('|').reduce((pred, field) => {
            const [key, val] = field.split(':');
            if (!val) return pred;

            const method = key.toLowerCase();
            switch (method) {
                case 'label':
                    return pred ? `${pred} AND label == "${val}"` : `label == "${val}"`;
                case 'name':
                    return pred ? `${pred} AND name == "${val}"` : `name == "${val}"`;
                case 'type':
                    return pred ? `${pred} AND type == "${val}"` : `type == "${val}"`;
                case 'visible':
                    return pred ? `${pred} AND visible == 1` : `visible == 1`;
                default:
                    return pred;
            }
        }, '');

        return `-ios predicate string:${predicate}`;
    }

}
