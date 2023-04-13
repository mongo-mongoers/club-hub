import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubCard = ({ club }) => {
  const truncatedDescription = club.description.slice(0, 200);
  const [bookmarked, setBookmarked] = useState(false); // Add bookmarked state and setter
  const handleBookmarkClick = () => {
    setBookmarked(!bookmarked); // Toggle bookmarked state
  };
  return (
    <Card style={{ width: '18rem' }} className="mx-auto">
      <Card.Header className="text-center">
        <Card.Img variant="top" src={club.logo} className="w-50" />
      </Card.Header>
      <Card.Body className="text-center">
        <Card.Title>{club.name} ({club.abbreviation})</Card.Title>
        <Card.Text className="text-start">{truncatedDescription}...</Card.Text>
        <Link className="text-success" to={`/clubInfo/${club.abbreviation}`}>More Info</Link>
      </Card.Body>
      <Card.Footer className="text-center">
        {club.topics.map((interest, index) => <div key={index} className="label-2 mx-1">{interest}</div>)}
        <button type="button" onClick={handleBookmarkClick}>
          {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
        </button>
      </Card.Footer>
    </Card>
  );
};

// Require a document to be passed to this component.
ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    abbreviation: PropTypes.string,
    logo: PropTypes.string,
    goals: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
};

export default ClubCard;
