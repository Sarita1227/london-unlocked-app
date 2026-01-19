# Automation Agent Context and Guidelines

This document serves as the source of truth for all AI-generated code within the London Unlocked mobile automation framework.

## 1. Technology Stack
*   **Core:** WebdriverIO (v8+)
*   **Driver:** Appium (UIAutomator2 / XCUITest)
*   **Language:** TypeScript
*   **Runner:** Mocha (describe, it)
*   **Assertions:** Chai (expect) and WDIO Expect (expect($).toBeDisplayed())

## 2. Architectural Rules (Page Object Model)
*   **Strict Encapsulation:** Locators (Selectors) must be private properties. Use public methods to expose interactions.
*   **Mobile-First Selectors:**
    *   Preferred: Accessibility ID (Use ~ prefix in WDIO).
    *   Fallback: XPath.
    *   Avoid: Absolute XPath or coordinate-based taps.
*   **Platform Agnostic:** Methods must handle both iOS and Android variations internally.

## 3. Coding Standards
*   **Async/Await:** All WDIO interactions are asynchronous.
*   **Waits:** Do not use hard pauses. Use explicit waits on elements.
*   **Chaining:** Return `this` from page methods where logical to allow fluent chaining.
*   **Data Separation:** Do not hard-code credentials. Use process.env or external data files.

## 4. Anti-Patterns
*   Usage of driver.sleep() or driver.pause().
*   Console logging for debugging (use the logger utility).
*   Locators defined inside test files (must be in Page Objects).
*   Test interdependency (every test must run in isolation).

## 5. Template: Page Object
```typescript
import { $ } from '@wdio/globals';

export default class LoginPage {
    private get inputUsername() { return $('~username-input'); }
    private get btnLogin() { return $('~login-button'); }

    public async login(user: string, pass: string) {
        await this.inputUsername.waitForDisplayed();
        await this.inputUsername.setValue(user);
        await this.btnLogin.click();
    }
}
```

## 6. Template: Test Spec
```typescript
import LoginPage from '../pages/login.page';
import { expect } from 'chai';

describe('User Authentication', () => {
    it('should allow valid login', async () => {
        await LoginPage.login('user', 'pass');
    });
});
```
## 7. Workflow Integration (CLI)
*   **Context:** We use a scaffolding tool (`npm run scaffold <FeatureName>`).
*   **Instruction:** When a user asks you to implement a feature, assume the file structure (`src/pages/X.page.ts` and `src/tests/specs/X.test.ts`) **already exists**.
*   **Task:** Do not generate file creation scripts. Instead, generate the **code content** to fill those specific pre-created files.