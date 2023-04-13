import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ClubsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ClubsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: { type: String },
      // Add a bookmarked field to store the bookmark status
      bookmarked: {
        type: Boolean,
        defaultValue: false,
      },
      abbreviation: { type: String },
      topics: { type: Array },
      'topics.$': {
        type: String,
      },
      description: { type: String },
      goals: { type: String },
      email: { type: String },
      logo: { type: String },
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Add a method to update the bookmark status for a club
  updateBookmark(clubId, bookmarked) {
    this.collection.update(clubId, {
      $set: {
        bookmarked: !bookmarked,
      },
    });
  }
}

export const Clubs = new ClubsCollection();
