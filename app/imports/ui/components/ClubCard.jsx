import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import _ from 'underscore';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import LoadingSpinner from './LoadingSpinner';
import { addProfilesClubs, removeClubMethod, removeProfilesClubs } from '../../startup/both/Methods';
import { ComponentIDs } from '../utilities/ids';

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
  // Adjusts length of description for clubCard
  const truncatedDescription = club.description.slice(0, 200);
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

  const editClub = () => {
    if (Meteor.userId()) {
      // Checks if the user is an admin
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      // Checks if the user is an owner (if username matches the email associated with the club)
      const isOwner = Meteor.user().username === club.email;
      return (isAdmin || isOwner) ? (
        <Link to={`/clubEdit/${club.slug}`}>
          <Button id="editclub-button" variant="outline-secondary">Edit Club</Button>
        </Link>
      ) : null;
    }
    return null;
  };

  const removeClub = () => {
    if (Meteor.userId()) {
      // Checks if the user is an admin
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      // Checks if the user is an owner (if username matches the email associated with the club)
      const isOwner = Meteor.user().username === club.email;

      if (isAdmin || isOwner) {
        const handleRemoveClub = () => {
          swal({
            title: 'Are you sure?',
            text: 'Once removed, you will not be able to recover this club!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                Meteor.call(removeClubMethod, { _id: club._id }, (error) => {
                  if (error) {
                    swal('Error removing club!', {
                      icon: 'error',
                    });
                  } else {
                    swal('Club removed successfully!', {
                      icon: 'success',
                    });
                  }
                });
              }
            });
        };

        return (
          <Button id="removeclub-button" variant="outline-danger" onClick={handleRemoveClub}>
            Remove Club
          </Button>
        );
      }
    }
    return null;
  };
  const buttonDisplay = () => {
    if (Meteor.userId()) {
      const clubNames = _.pluck(profilesClubs, 'clubName');
      const status = clubNames.includes(club.name);
      return <Button id="bookmark-button" variant="outline-secondary" type="button" onClick={() => handleBookmark(status ? 'remove' : 'add')}>{status ? 'Unbookmark' : 'Bookmark'}</Button>;
    }
    return null;
  };

  return ready ? (
    <Card id={ComponentIDs.clubCard} style={{ width: '24rem', height: '36rem' }} className="mx-auto">
      <Card.Header className="text-center">
        <Card.Img
          src={club.logo}
          alt={club.name}
          style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%' }}
        />
      </Card.Header>
      <Card.Body className="text-center d-flex flex-column justify-content-between">
        <Card.Title id="card-title" style={{ fontWeight: 'bold' }}>{club.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '1.5rem' }}>{club.abbreviation}</Card.Subtitle>
        <Card.Text className="text-start">{truncatedDescription}...</Card.Text>
        <div className="d-flex justify-content-start align-items-end">
          {editClub()}
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <Link to={`/clubInfo/${club.slug}`} style={{ textDecoration: 'none' }}>
            <Button id="moreinfo-button" variant="outline-secondary">More Info</Button>
          </Link>
          {buttonDisplay()}
        </div>
        {removeClub()}
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
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    goals: PropTypes.string,
    email: PropTypes.string,
    logo: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
