import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = ({ club }) => (
  <Card className="h-100">
    <Image src={club.logo} className="card-img-top" />
    <Card.Body className="text-center">
      <Card.Title>Club Abbreviation: {club.abbreviation}</Card.Title>
      <Card.Text>Club description: {club.description}</Card.Text>
      <Card.Text>{club.topics.map((interest, index) => <Badge key={index} bg="info">{interest}</Badge>)}</Card.Text>
      <Link to={`/clubInfo/${club.abbreviation}`}>MoreInfo</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    abbreviation: PropTypes.string,
    logo: PropTypes.string,
    goal: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
