import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
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
      return <Button variant="outline-secondary" type="button" onClick={() => handleBookmark(status ? 'remove' : 'add')}>{status ? 'Unbookmark' : 'Bookmark'}</Button>;
    }
    return null;
  };

  return ready ? (
    <Card style={{ width: '24rem', height: '32rem' }} className="mx-auto">
      <Card.Header className="text-center">
        <Card.Img
          src={club.logo}
          alt={club.name}
          style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%' }}
        />
      </Card.Header>
      <Card.Body className="text-center d-flex flex-column justify-content-between">
        <Card.Title style={{ fontWeight: 'bold' }}>{club.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1.5rem' }}>{club.abbreviation}</Card.Subtitle>
        <Card.Text className="text-start">{truncatedDescription}...</Card.Text>
        <Link to={`/clubEdit/${club.slug}`}>Edit Club</Link>
        <div className="d-flex justify-content-between align-items-end">
          <Link to={`/clubInfo/${club.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="outline-secondary">More Info</Button>
          </Link>
          {buttonDisplay()}
        </div>
      </Card.Body>
      <Card.Footer className="text-center">
        {club.topics.map((interest, index) => <div key={index} className="label-2 mx-1">{interest}</div>)}
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
/*
<Card className="mb-4" style={{ borderRadius: '0.5rem' }}>
      <Card.Img variant="top" src={club.logo} style={{ height: '10rem', objectFit: 'cover', borderRadius: '0.5rem 0.5rem 0 0' }} />
      <Card.Body className="p-4">
        <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>{club.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1.5rem' }}>{club.abbreviation}</Card.Subtitle>
        <Card.Text className="mb-3" style={{ fontSize: '1.2rem' }}>{truncatedDescription}...</Card.Text>
        <div className="d-flex justify-content-between">
          <Link to={`/clubInfo/${club.slug}`} style={{ textDecoration: 'none' }}>
            <Button variant="info">More Info</Button>
          </Link>
          <Link to={`/clubEdit/${club._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="outline-secondary">Edit Club</Button>
          </Link>
        </div>
      </Card.Body>
      <Card.Footer
        className="p-4 d-flex justify-content-between align-items-center"
        style={{ backgroundColor: '#f6f6f6', borderRadius: '0 0 0.5rem 0.5rem' }}
      >
        <div>
          {club.topics.map((interest, index) => (
            <Badge key={index} className="mx-1" variant="primary">{interest}</Badge>
          ))}
        </div>
        <div>
          {buttonDisplay()}
        </div>
      </Card.Footer>
    </Card>
 */
