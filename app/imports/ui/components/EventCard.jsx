import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Card, Row, Col, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { removeEventMethod } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventCard = ({ event }) => {
  const removeEvent = () => {
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    if (Meteor.userId()) {
      const isOwner = Meteor.user().username === event.email;
      if (isOwner && (!isAdmin)) {
        const handleRemoveEvent = () => {
          swal({
            title: 'Are you sure?',
            text: 'Once removed, you will not be able to recover this club!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          })
            .then((willDelete) => {
              if (willDelete) {
                Meteor.call(removeEventMethod, { _id: event._id }, (error) => {
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
          <Button id="removeclub-button" variant="outline-danger" onClick={handleRemoveEvent}>
            Remove Event
          </Button>
        );
      }
    }
    return null;
  };

  return (
    <Card className="h-100 w-75 mx-auto">
      <Card.Header>
        <Row className="justify-content-between">
          <Col>
            <h5>{event.club}</h5>
          </Col>
          <Col className="text-end">
            {event.date}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="text-start">{event.description}</Card.Text>
        <Card.Text>Location : {event.location}</Card.Text>
        <Card.Text>Contact : {event.email}</Card.Text>
        <div className="d-flex justify-content-between align-items-end">
          {removeEvent()}
        </div>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    club: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventCard;
