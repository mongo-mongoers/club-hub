import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';
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

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesProjects.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new project. Error if project already exists.  */
function addProject({ name, homepage, description, interests, picture }) {
  console.log(`Defining project ${name}`);
  Projects.collection.insert({ name, homepage, description, picture });
  interests.map(interest => ProjectsInterests.collection.insert({ project: name, interest }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
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
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));

  if (jsonData.defaultProjects && jsonData.defaultProfiles && jsonData.defaultClubs) {
    console.log('Creating the default profiles');
    jsonData.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default projects');
    jsonData.defaultProjects.map(project => addProject(project));
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

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
// Turned off, will not load unless this code block is placed above the loadAssetsFile
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProjects && Meteor.settings.defaultProfiles && Meteor.settings.defaultClubs) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default projects');
    Meteor.settings.defaultProjects.map(project => addProject(project));
    console.log('Creating the default clubs');
    Meteor.settings.defaultClubs.forEach(club => addClub(club));
    console.log('Adding profiles to clubs');
    Meteor.settings.defaultProfilesClubs.forEach(pClub => addProfilesClubs(pClub));
    console.log('Adding Events');
    Meteor.settings.defaultProfilesEvents.forEach(event => addEvents(event));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
