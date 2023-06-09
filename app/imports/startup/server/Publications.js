import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';
import { Clubs } from '../../api/clubs/Clubs';
import { Events } from '../../api/events/Events';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';

/** Define a publication to publish all profiles. */
Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

/** Define a publication to publish this collection. */
Meteor.publish(Clubs.userPublicationName, () => Clubs.collection.find());

/** Define a publication to publish this collection. */

Meteor.publish(Events.userPublicationName, () => Events.collection.find());

Meteor.publish(ProfilesClubs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ProfilesClubs.collection.find({ profileEmail: username });
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
