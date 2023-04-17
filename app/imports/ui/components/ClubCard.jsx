import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import LoadingSpinner from './LoadingSpinner';
import { addProfilesClubs, removeProfilesClubs } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = ({ club }) => {

  const { ready, profilesClubs } = useTracker(() => {
    // Get access to Club data.
    const subscription = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const rdy = subscription.ready();
    const data = ProfilesClubs.collection.find({}).fetch();
    return {
      ready: rdy,
      profilesClubs: data,
    };
  });

  const displayError = (error, result) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Document removed:', result);
    }
  };
  const handleBookmark = (status) => {
    const clubName = club.name;
    const profileEmail = Meteor.user().username;
    if (status === 'remove') {
      Meteor.call(removeProfilesClubs, { clubName, profileEmail }, displayError);
    } else {
      Meteor.call(addProfilesClubs, { clubName, profileEmail }, displayError);
    }
  };

  const truncatedDescription = club.description.slice(0, 200);
  const buttonDisplay = () => {
    if (Meteor.userId()) {
      const clubNames = _.pluck(profilesClubs, 'clubName');
      const status = clubNames.includes(club.name);
      return <button type="button" onClick={() => handleBookmark(status ? 'remove' : 'add')}>{status ? 'Unbookmark' : 'Bookmark'}</button>;
    }
    return null;
  };

  return ready ? (
    <Card style={{ width: '18rem', height: '35rem' }} className="mx-auto">
      <Card.Header className="text-center">
        <Card.Img style={{ height: '8rem' }} variant="top" src={club.logo} className="w-50" />
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>{club.name} ({club.abbreviation})</Card.Title>
        <Card.Text className="text-start">{truncatedDescription}...</Card.Text>
        <Link className="text-success" to={`/clubInfo/${club.slug}`}>More Info</Link>
        <br />
        <Link to={`/clubEdit/${club._id}`}>Edit Club</Link>
      </Card.Body>
      <Card.Footer className="text-center">
        {club.topics.map((interest, index) => <div key={index} className="label-2 mx-1">{interest}</div>)}
        {buttonDisplay()}
      </Card.Footer>
    </Card>
  ) : <LoadingSpinner />;
};

// Require a document to be passed to this component.
ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    abbreviation: PropTypes.string,
    logo: PropTypes.string,
    goals: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
