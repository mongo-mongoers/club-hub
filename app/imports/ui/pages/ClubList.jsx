import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, FormLabel, FormGroup, FormSelect } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/clubs/Clubs';
import { PageIDs } from '../utilities/ids';

/* Renders the Club List Page: Displays all the Clubs. */
const ClubList = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const { ready, clubs } = useTracker(() => {
    // Get access to Club data.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const rdy = subscription.ready();
    let data = [];
    if (selectedFilter) {
      data = Clubs.collection.find({ topics: selectedFilter }).fetch();
    } else {
      data = Clubs.collection.find({}).fetch();
    }
    return {
      ready: rdy,
      clubs: data,
    };
  }, [selectedFilter]);
  // Function to toggle bookmark status for a club
  const toggleBookmark = (clubId, bookmarked) => {
    Clubs.updateBookmark(clubId, !bookmarked);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  return ready ? (
    <Container id={PageIDs.clubList} fluid className="align-content-center mx-0 px-0">
      <div className="club-banner justify-content-center min-vw-100">
        <Row className="justify-content-center align-middle text-center py-5 text-white">
          <Col xs={5}>
            <h1>
              Clubs
            </h1>
          </Col>
        </Row>
      </div>
      <FormGroup className="mx-3 my-5">
        <FormLabel>Filter by topic:</FormLabel>
        <FormSelect onChange={handleFilterChange} value={selectedFilter || ''}>
          <option value="">All</option>
          <option value="Academic">Academic</option>
          <option value="Social">Social</option>
          <option value="ICS">ICS</option>
          <option value="Service">Service</option>
          <option value="Leisure">Leisure</option>
          <option value="Professional">Professional</option>
          <option value="Engineering">Engineering</option>
          <option value="Recreational">Recreational</option>
        </FormSelect>
      </FormGroup>
      <Row xs={1} md={2} lg={3} xxl={4} className="g-4 flex-wrap justify-content-center mx-0 my-5">

        {clubs.map((club, index) => (
          <Col key={index} className="d-flex align-items-stretch">
            <ClubCard key={index} club={club} bookmarked={club.bookmarked} toggleBookmark={toggleBookmark} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubList;
