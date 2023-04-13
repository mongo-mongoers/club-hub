import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';

const ClubList = () => {
  const { ready, clubs } = useTracker(() => {
    // Get access to Club data.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const data = Clubs.collection.find({}).fetch();
    return {
      ready: rdy,
      clubs: data,
    };
  }, []);
  // Function to toggle bookmark status for a club
  const toggleBookmark = (clubId, bookmarked) => {
    Clubs.updateBookmark(clubId, !bookmarked);
  };
  return ready ? (
    <Container style={pageStyle}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Club List</h2>
          </Col>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center m-auto">
            {clubs.map((club, index) => (
              <Col key={index}>
                <ClubCard club={club} bookmarked={club.bookmarked} toggleBookmark={toggleBookmark} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubList;
