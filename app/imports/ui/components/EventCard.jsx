import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventCard = ({ event }) => (
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
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
EventCard.propTypes = {
  event: PropTypes.shape({
    club: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};

export default EventCard;
