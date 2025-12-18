import { TestHelper } from '../helpers/TestHelper';
import { GuestJourneySteps } from '../steps';

describe("Guest user journey feature", () => {
    const authSteps = new GuestJourneySteps();

    //this will work as background for all tests in this test cases
    beforeEach(async () => {
        await authSteps.givenUserIsOnLandingPage();
    });

    afterEach(async () => {
        await TestHelper.takeScreenshot("guest-user-journey-feature");
    });

    /**
     * Test 1: Guest user can access unlocked content
     */
    //We can also add test level beforeEach and afterEach hooks if needed
    it("@test @sanity should allow guest user to access unlocked content", async () => {
        await authSteps.verifyGuestScreenOnClickingContinueAsGuestButton();
        await authSteps.userClicksOnUnclockedContent();
        await authSteps.userVerifyTheLogiRequiredPopupisDisplayed();
    });

    it('@test @sanity should explore multiple categories as guest', async () => {
        TestHelper.logInfo('Placeholder to add multiple scanrio here as a guest user');
    //TODO-"Please read" Demo test to show multiple scenarios can be added here in similar way
        //Please I have keep this file clear with informative function names all teh logging steps can be found in
        //the respective steps classes along with the implementation

    });
});