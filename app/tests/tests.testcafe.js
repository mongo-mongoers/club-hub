import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { signOutPage } from './signout.page';
import { signupPage } from './signup.page';
import { profilesPage } from './profiles.page';
import { navBar } from './navbar.component';
import { clubListPage } from './clublist.page';
import { clubCard } from './clubcard.component';
import { eventsPage } from './events.page';
import { createClubPage } from './createclub.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignUpPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signOutPage.isDisplayed(testController);
});

test('Test that club list page displays', async (testController) => {
  await navBar.gotoClubListPage(testController);
  await clubListPage.isDisplayed(testController);

});

test('Test that bookmark button changes myclubs, events page', async (testController) => {
  // Creates a new user
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.ensureLogout(testController);
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // Saves one club to user bookmarks
  await navBar.gotoClubListPage(testController);
  await clubCard.bookmarkClub(testController);
  // Checks if club count is = 1 on myClubs page
  await navBar.gotoBookmarksPage(testController);
  await profilesPage.clubCount(testController);
  // Checks if events page has events from bookmarked clubs
  await navBar.gotoEventsPage(testController);
  await eventsPage.eventCount(testController);
});

test('Test that edit club page shows up for club owners', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, 'acmmanoa@hawaii.edu', 'foo');
  await navBar.gotoClubListPage(testController);
  await clubCard.editClub(testController);
});

test('Test that create club page shows up for admins', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, 'henric@hawaii.edu', 'foo');
  await navBar.gotoCreateClubPage(testController);
  await createClubPage.isDisplayed(testController);
});

test.only('Test that admins can create a club via create clubs page', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signInPage.signin(testController, 'henric@hawaii.edu', 'foo');
  await navBar.gotoCreateClubPage(testController);
  await createClubPage.addClub(testController);

});
// test('Test that home page display and profile modification works', async (testController) => {
//   await navBar.ensureLogout(testController);
//   await navBar.gotoSignInPage(testController);
//   await signInPage.signin(testController, credentials.username, credentials.password);
//   await homePage.isDisplayed(testController);
//   await homePage.updateProfile(testController, credentials.firstName);
//   await navBar.ensureLogout(testController);
// });

// test('Test that filter page works', async (testController) => {
//   await navBar.ensureLogout(testController);
//   await navBar.gotoSignInPage(testController);
//   await signInPage.signin(testController, credentials.username, credentials.password);
//   await navBar.gotoFilterPage(testController);
//   await filterPage.isDisplayed(testController);
//   await filterPage.filter(testController);
// });
