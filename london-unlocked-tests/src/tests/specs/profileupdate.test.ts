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

    afterEach(async () => {
        await TestHelper.takeScreenshot('profile-update-feature');

        // Clean up after each test - reset app to landing page for next test
        try {
            await profileSteps.cleanupAfterTest();
        } catch (error) {
            console.log('⚠️ Test cleanup completed with warnings');
        }
    });

    it('@test @sanity should navigate to profile after successful login', async () => {
        // Step 1: Login with valid credentials
        await loginSteps.userClickOnGetStartedButton();
        await loginSteps.userEnterEmailAddress(testData.validUser.email);
        await loginSteps.userEnterEmailPassword(testData.validUser.password);
        await loginSteps.userClicksOnLogin();
        await loginSteps.userShouldbeLoggedSuccessfully();

        // Step 2: Navigate to profile settings
        await ProfileUpdatePage.navigateToProfile();
        await ProfileUpdatePage.waitForProfilePageLoad();

        // Step 3: Verify profile information is displayed
        await ProfileUpdatePage.verifyAccountStatus();

        TestHelper.logSuccess('Successfully navigated from login to profile');
    });

    it('@test should verify profile settings toggles work', async () => {
        // Login first
        await loginSteps.userClickOnGetStartedButton();
        await loginSteps.userEnterEmailAddress(testData.validUser.email);
        await loginSteps.userEnterEmailPassword(testData.validUser.password);
        await loginSteps.userClicksOnLogin();
        await loginSteps.userShouldbeLoggedSuccessfully();

        // Navigate to profile
        await profileSteps.navigateToProfileSettings();

        // Test toggle switches
        await profileSteps.toggleGuestPrompts();
        await profileSteps.toggleShowTips();

        TestHelper.logSuccess('Profile settings toggles verified');
    });

    it('@test should verify profile information display', async () => {
        // Login with valid user
        await loginSteps.userClickOnGetStartedButton();
        await loginSteps.userEnterEmailAddress(testData.validUser.email);
        await loginSteps.userEnterEmailPassword(testData.validUser.password);
        await loginSteps.userClicksOnLogin();
        await loginSteps.userShouldbeLoggedSuccessfully();

        // Navigate to profile and verify information
        await profileSteps.navigateToProfileSettings();
        await profileSteps.verifyProfileInformation('testuser', testData.validUser.email);

        TestHelper.logSuccess('Profile information display verified');
    });
});
