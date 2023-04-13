import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/** Encapsulates state and variable values for this collection. */
class ProfilesClubsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesClubsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      profileEmail: String,
      clubName: String,
      bookmarked: {
        type: Boolean,
        defaultValue: false,
      },
      // Other fields for bookmark information, if applicable
    });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  // Insert a new document with bookmark information
  insert(profileEmail, clubName, bookmarked = false) {
    return this.collection.insert({ profileEmail, clubName, bookmarked });
  }

  // Update bookmark information for a document
  update(documentId, bookmarked) {
    this.collection.update({ _id: documentId }, { $set: { bookmarked } });
  }

  // Add a bookmark for a club
  addBookmark(profileEmail, clubName) {
    // Check if the bookmark already exists
    const existingBookmark = this.collection.findOne({ profileEmail, clubName });
    if (existingBookmark) {
      // If bookmark already exists, update the bookmarked field
      this.update(existingBookmark._id, true);
    } else {
      // If bookmark doesn't exist, insert a new document with bookmark information
      this.insert(profileEmail, clubName, true);
    }
  }

  // Remove a bookmark for a club
  removeBookmark(profileEmail, clubName) {
    // Check if the bookmark exists
    const existingBookmark = this.collection.findOne({ profileEmail, clubName });
    if (existingBookmark) {
      // If bookmark exists, update the bookmarked field
      this.update(existingBookmark._id, false);
    }
  }
}
export const ProfilesClubs = new ProfilesClubsCollection();
