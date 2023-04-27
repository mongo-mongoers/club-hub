import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ClubCard from '../components/ClubCard';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';
/* Component for layout out a Profile Card. */

import { PageIDs } from '../utilities/ids';

/* Renders the Profiles Page: Displays the Clubs that the User has bookmarked. */

const ProfilesPage = () => {
  const { ready, clubData } = useTracker(() => {
    // Get access to Club data and Bookmarks.
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
    <Container id={PageIDs.profilesPage} fluid className="align-content-center mx-0 px-0">
      <div className="club-banner justify-content-center min-vw-100">
        <Row className="justify-content-center align-middle text-center py-5 text-white">
          <Col xs={5}>
            <h1>
              Bookmarks
            </h1>
          </Col>
        </Row>
      </div>
      <Row xs={1} md={2} lg={3} xxl={4} className="g-4 flex-wrap justify-content-center mx-0 my-5">
        {clubData.map((club, index) => (
          <Col key={index} className="d-flex align-items-stretch">
            <ClubCard key={index} club={club} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
