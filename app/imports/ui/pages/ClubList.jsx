import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';
import { PageIDs } from '../utilities/ids';

/* Renders the Club List Page: Displays all the Clubs. */
const ClubList = () => {
  const { ready, clubs } = useTracker(() => {
    // Get access to Club data.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
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
    <Container id={PageIDs.clubList} className="align-content-center mx-0 px-0">
      <div className="club-banner justify-content-center min-vw-100">
        <Row className="justify-content-center align-middle text-center py-5 text-white">
          <Col xs={5}>
            <h1>
              Clubs
            </h1>
          </Col>
        </Row>
      </div>
      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center mx-0 my-5 min-vw-100">
        {clubs.map((club, index) => (<Col key={index} className="align-items-center text-center"> <ClubCard key={index} club={club} bookmarked={club.bookmarked} toggleBookmark={toggleBookmark} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubList;
