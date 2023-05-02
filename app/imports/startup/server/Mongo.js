import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { Events } from '../../api/events/Events';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
// eslint-disable-next-line no-unused-vars
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
}

function addClub({ name, slug, abbreviation, topics, description, goals, email, logo }) {
  console.log(`Defining club ${name}`);
  Clubs.collection.insert({ name, slug, abbreviation, topics, description, goals, email, logo });
}
function addEvents({ club, name, date, description, email, location }) {
  console.log(`Defining Event ${club}`);
  Events.collection.insert({ club, name, date, description, email, location });
}
function addProfilesClubs({ profileEmail, clubName }) {
  console.log(`Defining profile ${profileEmail} is in ${clubName}`);
  ProfilesClubs.collection.insert({ profileEmail, clubName });
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));

  if (jsonData.defaultProjects && jsonData.defaultProfiles && jsonData.defaultClubs) {
    console.log('Creating the default profiles');
    jsonData.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default clubs');
    jsonData.defaultClubs.forEach(club => addClub(club));
    console.log('Adding profiles to clubs');
    jsonData.defaultProfilesClubs.forEach(pClub => addProfilesClubs(pClub));
    console.log('Adding Events');
    jsonData.defaultProfilesEvents.forEach(event => addEvents(event));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
