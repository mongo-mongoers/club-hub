import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import ClubCard from '../components/ClubCard';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
/* Component for layout out a Profile Card. */

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {

  const { ready, clubData } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const sub2 = Meteor.subscribe(Clubs.userPublicationName);
    const userProfilesClubs = ProfilesClubs.collection.find({}).fetch();
    const userClubNames = userProfilesClubs.map((profileClub) => profileClub.clubName);
    const clubs = userClubNames.map((clubName) => Clubs.collection.findOne({ name: clubName }));
    return {
      ready: sub1.ready() && sub2.ready(),
      clubData: clubs,
    };
  }, []);
  return ready ? (
    <Container style={pageStyle}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center m-auto">
            {clubData.map((club, index) => (<Col> <ClubCard key={index} club={club} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
