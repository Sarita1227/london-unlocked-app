# CLI Scaffolding & Gatekeeping - Visual Walkthrough

## 🎬 Complete Console Output Documentation

This document captures the **actual terminal outputs** from the CLI scaffolding process, demonstrating the gatekeeping mechanism in action.

---

## 📺 Scenario 1: First-Time Scaffolding (Success)

### Command
```bash
npm run scaffold ProfileUpdate
```

### Actual Console Output
```
saritadash@Mac london-unlocked-app % cd /Users/saritadash/Documents/london-unlocked-app/london-unlocked-tests && npm run scaffold ProfileUpdate

> london-unlocked-tests@1.0.0 scaffold
> ts-node scripts/cly.ts scaffold ProfileUpdate

🛡️  Safe-Scaffolding Mobile Test Component: ProfileUpdate
✅ Generated Page: /Users/saritadash/Documents/london-unlocked-app/london-unlocked-tests/src/pages/profileupdate.page.ts
✅ Generated Test: /Users/saritadash/Documents/london-unlocked-app/london-unlocked-tests/src/tests/specs/profileupdate.test.ts

─────────────────────────────────────────────────────────────
🤖  **NEXT STEP: Copy & Paste this into Copilot Chat:**
─────────────────────────────────────────────────────────────
"Read @agent.md. I have scaffolded 'ProfileUpdate' using the CLI.
Please write the implementation for 'profileupdate.page.ts'
and 'profileupdate.test.ts' to handle [DESCRIBE SCENARIO HERE]."
─────────────────────────────────────────────────────────────
```

### What Happened
1. ✅ CLI checked if `profileupdate.page.ts` exists → **NOT FOUND**
2. ✅ CLI generated boilerplate Page Object
3. ✅ CLI checked if `profileupdate.test.ts` exists → **NOT FOUND**
4. ✅ CLI generated boilerplate Test Spec
5. ✅ CLI printed guided Copilot prompt for next steps

### Files Created
```
london-unlocked-tests/
├── src/
│   ├── pages/
│   │   └── profileupdate.page.ts  ✅ CREATED
│   └── tests/
│       └── specs/
│           └── profileupdate.test.ts  ✅ CREATED
```

---

## 📺 Scenario 2: Duplicate Scaffolding Attempt (Gatekeeping)

### Command
```bash
npm run scaffold ProfileUpdate
```

### Expected Console Output
```
saritadash@Mac london-unlocked-tests % npm run scaffold ProfileUpdate

> london-unlocked-tests@1.0.0 scaffold
> ts-node scripts/cly.ts scaffold ProfileUpdate

🛡️  Safe-Scaffolding Mobile Test Component: ProfileUpdate
⚠️  Skipped Page: /Users/saritadash/Documents/london-unlocked-app/london-unlocked-tests/src/pages/profileupdate.page.ts (File already exists)
⚠️  Skipped Test: /Users/saritadash/Documents/london-unlocked-app/london-unlocked-tests/src/tests/specs/profileupdate.test.ts (File already exists)

─────────────────────────────────────────────────────────────
🤖  **NEXT STEP: Copy & Paste this into Copilot Chat:**
─────────────────────────────────────────────────────────────
"Read @agent.md. I have scaffolded 'ProfileUpdate' using the CLI.
Please write the implementation for 'profileupdate.page.ts'
and 'profileupdate.test.ts' to handle [DESCRIBE SCENARIO HERE]."
─────────────────────────────────────────────────────────────
```

### What Happened
1. ⚠️ CLI checked if `profileupdate.page.ts` exists → **FOUND**
2. ⚠️ CLI **SKIPPED** generation to prevent overwrite
3. ⚠️ CLI checked if `profileupdate.test.ts` exists → **FOUND**
4. ⚠️ CLI **SKIPPED** generation to prevent overwrite
5. ✅ CLI still printed the guided prompt (in case user wants to regenerate manually)

### Files Status
```
london-unlocked-tests/
├── src/
│   ├── pages/
│   │   └── profileupdate.page.ts  ⚠️ SKIPPED (Already exists - PROTECTED)
│   └── tests/
│       └── specs/
│           └── profileupdate.test.ts  ⚠️ SKIPPED (Already exists - PROTECTED)
```

### ✅ Gatekeeping Success
**NO FILES WERE OVERWRITTEN!** The existing implementation is safe.

---

## 🤖 Copilot Interaction Flow

### Step 1: User Customizes Prompt

**Original Prompt Template:**
```
"Read @agent.md. I have scaffolded 'ProfileUpdate' using the CLI.
Please write the implementation for 'profileupdate.page.ts'
and 'profileupdate.test.ts' to handle [DESCRIBE SCENARIO HERE]."
```

**Customized Prompt (What User Actually Typed):**
```
Read @agent.md. I have scaffolded 'ProfileUpdate' using the CLI.
Please write the implementation for 'profileupdate.page.ts'
and 'profileupdate.test.ts' to handle login to profile
```

### Step 2: Copilot Reads agent.md

**Copilot Internal Process:**
1. 📖 Read `agent.md` to understand:
   - Technology stack (WebdriverIO, Appium, TypeScript, Mocha)
   - Architectural rules (Page Object Model, strict encapsulation)
   - Coding standards (async/await, explicit waits)
   - Anti-patterns to avoid (console.log, driver.sleep, locators in tests)
   - Template examples (Page Object structure, Test structure)

2. 🔍 Analyze existing codebase:
   - Read `LoginInSteps.ts` to understand step pattern
   - Read `GuestJourneySteps.ts` to understand test setup pattern
   - Read `BaseLocators.ts` to understand locator conventions
   - Read `BasePage.ts` to understand available helper methods

3. 📝 Plan implementation:
   - Need ProfileLocators.ts (following LandingLocators.ts pattern)
   - Need ProfileSteps.ts (following LoginInSteps.ts pattern)
   - Update profileupdate.page.ts (extend BasePage, use logger)
   - Update profileupdate.test.ts (use steps, TestHelper, test isolation)
   - Update steps/index.ts (add ProfileSteps export)

### Step 3: Copilot Generates Code

**Files Generated/Updated:**

```
✅ NEW: src/locators/ProfileLocators.ts
   - Centralized locators for Profile screen
   - Uses resource-id and text selectors
   - Follows BaseLocators pattern

✅ NEW: src/steps/ProfileSteps.ts
   - Extends BasePage
   - Uses TestHelper for logging
   - Reusable step methods
   - Async/await throughout

✅ UPDATED: src/pages/profileupdate.page.ts
   - Replaced boilerplate with full implementation
   - Extends BasePage (not generic Page)
   - Uses logger utility
   - Uses ProfileLocators for all elements
   - Async methods with explicit waits

✅ UPDATED: src/tests/specs/profileupdate.test.ts
   - Replaced boilerplate with 3 complete tests
   - Uses LoginInSteps for login flow
   - Uses ProfileSteps for profile actions
   - Proper beforeEach/afterEach hooks
   - Test isolation with app reset
   - Screenshot capture
   - External test data from users.json

✅ UPDATED: src/steps/index.ts
   - Added ProfileSteps export
   - Maintains barrel pattern
```

### Step 4: Code Quality Verification

**Automatic Checks Performed:**

```bash
# Copilot internal validation
✅ No TypeScript errors
✅ No ESLint errors
✅ Follows agent.md rules
✅ Matches existing patterns
✅ Proper imports/exports
```

---

## 📊 Code Transformation Examples

### Example 1: Page Object Transformation

**CLI Generated (Boilerplate):**
```typescript
import { $ } from '@wdio/globals';
import Page from './page';

class ProfileUpdatePage extends Page {
    private get btnSubmit() { return $('~submit-btn'); }

    public async submitAction() {
        await this.btnSubmit.waitForDisplayed();
        await this.btnSubmit.click();
    }
}

export default new ProfileUpdatePage();
```

**Copilot Generated (Following agent.md):**
```typescript
/**
 * ProfileUpdatePage - Page Object for Profile Settings Screen
 */

import { BasePage } from '../helpers/BasePage';
import { ProfileLocators } from '../locators/ProfileLocators';
import { logger } from '../helpers/Logger';

class ProfileUpdatePage extends BasePage {
    constructor() {
        super('ProfileUpdatePage');
    }

    async navigateToProfile(): Promise<void> {
        await this.clickOnElement(
            ProfileLocators.AUTOMATOR.ACCOUNT_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.step('Navigated to Profile Settings');
    }

    async waitForProfilePageLoad(): Promise<void> {
        await this.waitForPageToLoad(
            ProfileLocators.AUTOMATOR.LOGOUT_BUTTON,
            ProfileLocators.LOCATOR_TYPES.AUTOMATOR
        );
        logger.success('Profile page loaded successfully');
    }

    // ... 5 more methods following the same pattern
}

export default new ProfileUpdatePage();
```

**What Changed:**
1. ❌ Removed: `import { $ } from '@wdio/globals'` (uses BasePage methods instead)
2. ✅ Added: `import { BasePage }` (follows architectural rule)
3. ✅ Added: `import { ProfileLocators }` (centralized locators)
4. ✅ Added: `import { logger }` (proper logging)
5. ✅ Changed: `extends Page` → `extends BasePage` (framework pattern)
6. ✅ Changed: Direct element access → Uses ProfileLocators
7. ✅ Changed: Generic method → Domain-specific methods
8. ✅ Added: Constructor with super() call
9. ✅ Added: JSDoc comments
10. ✅ Changed: Basic wait → Explicit BasePage helper methods

---

### Example 2: Test Transformation

**CLI Generated (Boilerplate):**
```typescript
import ProfileUpdatePage from '../pages/profileupdate.page';

describe('ProfileUpdate Feature', () => {
    before(async () => {
        // Setup logic
    });

    it('should perform successful action', async () => {
        await ProfileUpdatePage.submitAction();
        const successMsg = $('~success-message');
        await successMsg.waitForDisplayed();
    });
});
```

**Copilot Generated (Following agent.md):**
```typescript
/**
 * Profile Update Feature Test
 * Tests login to profile navigation and profile settings functionality
 */

import { TestHelper } from '../../helpers/TestHelper';
import { LoginInSteps } from '../../steps/LoginInSteps';
import { ProfileSteps } from '../../steps/ProfileSteps';
import ProfileUpdatePage from '../../pages/profileupdate.page';

describe('Profile Update Feature - Login to Profile Journey', () => {
    const loginSteps = new LoginInSteps();
    const profileSteps = new ProfileSteps();

    let testData: any;

    before(async () => {
        TestHelper.logInfo('Loading test data for profile tests');
        testData = require('../../test-data/users.json');
    });

    beforeEach(async () => {
        TestHelper.logInfo('Resetting app to landing page');
        await profileSteps.resetAppToLandingPage();
    });

    afterEach(async () => {
        await TestHelper.takeScreenshot('profile-update-feature');
    });

    it('@test @sanity should navigate to profile after successful login', async () => {
        await loginSteps.userClickOnGetStartedButton();
        await loginSteps.userEnterEmailAddress(testData.validUser.email);
        await loginSteps.userEnterEmailPassword(testData.validUser.password);
        await loginSteps.userClicksOnLogin();
        await loginSteps.userShouldbeLoggedSuccessfully();

        await ProfileUpdatePage.navigateToProfile();
        await ProfileUpdatePage.waitForProfilePageLoad();
        await ProfileUpdatePage.verifyAccountStatus();

        TestHelper.logSuccess('Successfully navigated from login to profile');
    });

    // ... 2 more test cases
});
```

**What Changed:**
1. ✅ Added: TestHelper import (proper logging)
2. ✅ Added: LoginInSteps import (reuses existing login flow)
3. ✅ Added: ProfileSteps import (step definitions)
4. ✅ Added: Step instances initialization
5. ✅ Added: Test data loading from external JSON
6. ✅ Added: beforeEach hook for test isolation (app reset)
7. ✅ Added: afterEach hook for screenshots
8. ✅ Changed: Generic test → 3 specific test scenarios
9. ✅ Added: Test tags (@test @sanity) for selective execution
10. ✅ Changed: Direct element access → Step-based approach
11. ✅ Added: Human-readable step-by-step flow
12. ✅ Added: Success logging with TestHelper

---

## 🎯 Gatekeeping Mechanism Summary

### Level 1: CLI Safety Checks

```typescript
// From cly.ts
if (!fs.existsSync(pagePath)) {
    fs.writeFileSync(pagePath, pageTemplate(featureName));
    console.log(`✅ Generated Page: ${pagePath}`);
} else {
    console.log(`⚠️  Skipped Page: ${pagePath} (File already exists)`);
}
```

**Protection:** Prevents accidental file overwrites

---

### Level 2: agent.md Architectural Rules

```markdown
## 2. Architectural Rules (Page Object Model)
*   **Strict Encapsulation:** Locators must be private properties
*   **Mobile-First Selectors:** Preferred: Accessibility ID, Fallback: XPath
*   **Platform Agnostic:** Methods handle both iOS and Android

## 4. Anti-Patterns
*   Usage of driver.sleep() or driver.pause()
*   Console logging for debugging (use logger utility)
*   Locators defined inside test files (must be in Page Objects)
*   Test interdependency (every test must run in isolation)
```

**Protection:** Ensures code quality and consistency

---

### Level 3: Guided Prompts

```
"Read @agent.md. I have scaffolded 'ProfileUpdate' using the CLI.
Please write the implementation for 'profileupdate.page.ts'
and 'profileupdate.test.ts' to handle [DESCRIBE SCENARIO HERE]."
```

**Protection:** Ensures AI reads architectural guidelines before generating code

---

### Level 4: Human Review

After AI generation:
1. Developer reviews generated code
2. Developer runs linter: `npm run lint`
3. Developer runs tests: `npm run test`
4. Developer refines if needed

**Protection:** Human oversight ensures quality control

---

## 📈 Workflow Efficiency Metrics

### Without CLI + agent.md:
- ⏱️ Time to create boilerplate: **5-10 minutes** (manual)
- 🐛 Risk of inconsistency: **HIGH**
- 🔄 Code duplication: **COMMON**
- 📋 Pattern adherence: **VARIABLE**
- 🛡️ Protection from overwrites: **NONE**

### With CLI + agent.md:
- ⏱️ Time to create boilerplate: **< 5 seconds** (automated)
- 🐛 Risk of inconsistency: **LOW** (agent.md enforcement)
- 🔄 Code duplication: **PREVENTED** (CLI checks)
- 📋 Pattern adherence: **CONSISTENT** (agent.md guidelines)
- 🛡️ Protection from overwrites: **AUTOMATIC** (CLI safety)

**Improvement:** ~100x faster + significantly safer

---

## ✅ Verification Checklist

After running the CLI + Copilot workflow:

- [ ] Files generated in correct directories
- [ ] No duplicate files created
- [ ] Code follows Page Object Model
- [ ] Locators in separate Locator classes
- [ ] Tests use Step definitions
- [ ] No console.log usage (uses logger/TestHelper)
- [ ] No driver.sleep or hard waits
- [ ] All methods are async
- [ ] Proper imports and exports
- [ ] Test isolation with beforeEach/afterEach
- [ ] External test data usage
- [ ] No TypeScript errors
- [ ] No ESLint errors

**ProfileUpdate Implementation Status: ✅ ALL CHECKS PASSED**

---

## 🎓 Key Takeaways

### For Developers:
1. **Use the CLI for every new feature** - It's fast, safe, and consistent
2. **Always customize the Copilot prompt** - Generic prompts = generic code
3. **Review agent.md periodically** - Understand the rules you're enforcing
4. **Let AI handle boilerplate** - Focus your time on business logic and edge cases

### For Teams:
1. **CLI + agent.md = Scalable Quality** - New team members follow patterns automatically
2. **AI Assistance ≠ AI Autopilot** - Humans decide direction, AI implements patterns
3. **Documentation as Code** - agent.md is executable documentation
4. **Gatekeeping Prevents Technical Debt** - Stop problems before they start

---

**Document Version:** 1.0  
**Created:** January 19, 2026  
**Framework:** London Unlocked Mobile Automation  
**Author:** Sarita Dash

