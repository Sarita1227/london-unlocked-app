/**
 * CLY: Mobile Automation Scaffolding Tool
 * Stack: WDIO + Appium + Mocha + TypeScript
 */

import * as fs from 'fs';
import * as path from 'path';

const args = process.argv.slice(2);
const command = args[0];
const featureName = args[1];

const rootDir = process.cwd();

const pageTemplate = (name: string) => `import { $ } from '@wdio/globals';
import Page from './page';

class ${name}Page extends Page {
    private get btnSubmit() { return $('~submit-btn'); }

    public async submitAction() {
        await this.btnSubmit.waitForDisplayed();
        await this.btnSubmit.click();
    }
}

export default new ${name}Page();
`;

const testTemplate = (name: string) => `import ${name}Page from '../pages/${name.toLowerCase()}.page';

describe('${name} Feature', () => {
    before(async () => {
        // Setup logic
    });

    it('should perform successful action', async () => {
        await ${name}Page.submitAction();
        const successMsg = $('~success-message');
        await successMsg.waitForDisplayed();
    });
});
`;

// if (command === 'scaffold' && featureName) {
//     console.log(`Scaffolding Mobile Test Component: ${featureName}`);
//
//     const pagesDir = path.join(rootDir, 'src/pages');
//     const testsDir = path.join(rootDir, 'src/tests/specs');
//
//     [pagesDir, testsDir].forEach(dir => {
//         if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
//     });
//
//     const pagePath = path.join(pagesDir, `${featureName.toLowerCase()}.page.ts`);
//     const testPath = path.join(testsDir, `${featureName.toLowerCase()}.test.ts`);
//
//     // SAFETY CHECK: Only write if file DOES NOT exist
//     if (!fs.existsSync(pagePath)) {
//         fs.writeFileSync(pagePath, pageTemplate(featureName));
//         console.log(`Generated Page: ${pagePath}`);
//     } else {
//         console.log(`Skipped Page: ${pagePath} (File already exists)`);
//     }
//
//     if (!fs.existsSync(testPath)) {
//         fs.writeFileSync(testPath, testTemplate(featureName));
//         console.log(`Generated Test: ${testPath}`);
//     } else {
//         console.log(`Skipped Test: ${testPath} (File already exists)`);
//     }
//
// } else {
//     console.log("Usage: npx ts-node scripts/cly.ts scaffold <FeatureName>");
// }

if (command === 'scaffold' && featureName) {
    console.log(`🛡️  Safe-Scaffolding Mobile Test Component: ${featureName}`);

    const pagesDir = path.join(rootDir, 'src/pages');
    const testsDir = path.join(rootDir, 'src/tests/specs');

    [pagesDir, testsDir].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    const pagePath = path.join(pagesDir, `${featureName.toLowerCase()}.page.ts`);
    const testPath = path.join(testsDir, `${featureName.toLowerCase()}.test.ts`);

    // 1. Create Page Object
    if (!fs.existsSync(pagePath)) {
        fs.writeFileSync(pagePath, pageTemplate(featureName));
        console.log(`✅ Generated Page: ${pagePath}`);
    } else {
        console.log(`⚠️  Skipped Page: ${pagePath} (File already exists)`);
    }

    // 2. Create Test Spec
    if (!fs.existsSync(testPath)) {
        fs.writeFileSync(testPath, testTemplate(featureName));
        console.log(`✅ Generated Test: ${testPath}`);
    } else {
        console.log(`⚠️  Skipped Test: ${testPath} (File already exists)`);
    }

    // 3. THE MAGIC LINK: Generate the prompt for the user
    console.log(`\n─────────────────────────────────────────────────────────────`);
    console.log(`🤖  **NEXT STEP: Copy & Paste this into Copilot Chat:**`);
    console.log(`─────────────────────────────────────────────────────────────`);
    console.log(`"Read @agent.md. I have scaffolded '${featureName}' using the CLI.`);
    console.log(`Please write the implementation for '${featureName.toLowerCase()}.page.ts'`);
    console.log(`and '${featureName.toLowerCase()}.test.ts' to handle [DESCRIBE SCENARIO HERE]."`);
    console.log(`─────────────────────────────────────────────────────────────\n`);

} else {
    console.log("Usage: npm run scaffold <FeatureName>");
}