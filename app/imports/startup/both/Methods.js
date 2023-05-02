import { Meteor } from 'meteor/meteor';
import { Clubs } from '../../api/clubs/Clubs';
import { Events } from '../../api/events/Events';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import slugify from '../../api/methods/slug';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const createEventMethod = 'Events.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Events.add'({ club, name, date, description, email, location }) {
    Events.collection.insert({ club, name, date, description, email, location });
  },
});

const removeEventMethod = 'Event.remove';

Meteor.methods({
  'Event.remove'({ _id }) {
    Events.collection.remove({ _id });
  },
});
const createClubMethod = 'Clubs.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'Clubs.add'({ name, slug, abbreviation, topics, description, goals, email, logo }) {
    Clubs.collection.insert({ name, slug, abbreviation, topics, description, goals, email, logo });
  },
});

const editClubMethod = 'Clubs.edit';

Meteor.methods({
  'Clubs.edit'({ _id, name, abbreviation, topics, description, goals, email, logo }) {
    const slug = slugify(name);
    Clubs.collection.update(
      { _id },
      { $set: { name, slug, abbreviation, topics, description, goals, email, logo } },
    );
  },
});

const removeClubMethod = 'Clubs.remove';

Meteor.methods({
  'Clubs.remove'({ _id }) {
    Clubs.collection.remove({ _id });
  },
});

const addProfilesClubs = 'ProfilesClubs.add';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'ProfilesClubs.add'({ clubName, profileEmail }) {
    ProfilesClubs.collection.insert({ profileEmail: profileEmail, clubName: clubName });
  },
});

const removeProfilesClubs = 'ProfilesClubs.remove';

/** Creates a new project in the Projects collection, and also updates ProfilesProjects and ProjectsInterests. */
Meteor.methods({
  'ProfilesClubs.remove'({ clubName, profileEmail }) {
    ProfilesClubs.collection.remove({ profileEmail, clubName });
  },
});

export { createClubMethod, editClubMethod, removeClubMethod, addProfilesClubs, removeProfilesClubs, createEventMethod, removeEventMethod };
