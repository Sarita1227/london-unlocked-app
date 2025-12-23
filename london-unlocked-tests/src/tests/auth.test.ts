import { GuestJourneySteps, LoginInSteps } from '../steps';
import { TestHelper } from '../helpers/TestHelper';
import * as testData from '../../test-data/users.json';

/**
 * Authentication Feature Test Suite
 */
describe('Login Screen Feature', () => {
    const loginSteps = new LoginInSteps();
    const authSteps = new GuestJourneySteps();

    // Background: Runs before each test
    beforeEach(async () => {
        await authSteps.givenUserIsOnLandingPage();
        await loginSteps.userClickOnGetStartedButton();
    });

    afterEach(async () => {
        await TestHelper.takeScreenshot('auth-feature-test');

        // Clean up after each test - reset app to landing page for next test
        try {
            await authSteps.cleanupAfterTest();
        } catch (error) {
            console.log('Test cleanup completed with warnings');
        }
    });

    // TEST 1: DATA-DRIVEN LOGIN SCENARIOS
    describe('Data-Driven Login Scenarios with Invalid Data', () => {

        const loginScenarios = [
            {
                scenario: 'Invalid email pattern',
                email: testData.invalidUser.email,
                password: testData.invalidUser.password,
                fieldToCheck: 'email',
                expectedBehavior: 'should show error message'
            },
            {
                scenario: 'Invalid password',
                email: testData.invalidPassword.email,
                password: testData.invalidPassword.password,
                fieldToCheck: 'password',
                expectedBehavior: 'should show error message'
            },
            {
                scenario: 'Blank credentials',
                email: testData.blankCreds.email,
                password: testData.blankCreds.password,
                fieldToCheck: 'both',
                expectedBehavior: 'should show validation error'
            }
        ];

        loginScenarios.forEach(({ scenario, email, password, fieldToCheck, expectedBehavior }) => {
            it(`@test @sanity should handle ${scenario} - ${expectedBehavior}`, async () => {
                await loginSteps.userEnterEmailAddress(email);
                await loginSteps.userEnterEmailPassword(password);
                await loginSteps.userClicksOnLogin();
                await loginSteps.userVerifyCredentialsError(fieldToCheck);
            });
        });
    });

    // TEST 2: SUCCESSFUL LOGIN ATTEMPT
    describe('Successful Login Attempt', () => {
        it('@test @sanity should login successfully with valid credentials', async () => {
            TestHelper.logInfo('Testing successful login flow');
            await loginSteps.userEnterEmailAddress(testData.validUser.email);
            await loginSteps.userEnterEmailPassword(testData.validUser.password);
            await loginSteps.userClicksOnLogin();
            await loginSteps.userShouldbeLoggedSuccessfully();
        });
    });

});

