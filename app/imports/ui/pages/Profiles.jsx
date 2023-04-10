import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import LoadingSpinner from '../components/LoadingSpinner';
import { pageStyle } from './pageStyles';
import ClubCard from '../components/ClubCard';
import { ProfilesClubs } from '../../api/profiles/ProfilesClubs';
import { Clubs } from '../../api/clubs/Clubs';

/* Returns the Profile and associated Projects and Interests associated with the passed user email. */
// function getProfileData(email) {
//   const data = Profiles.collection.findOne({ email });
//   const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
//   const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
//   const projectPictures = projects.map(project => Projects.collection.findOne({ name: project })?.picture);
//   // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
//   return _.extend({}, data, { interests, projects: projectPictures });
// }

/* Component for layout out a Profile Card. */

/* Renders the Profile Collection as a set of Cards. */
const ProfilesPage = () => {

  const { ready, user } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub4 = Meteor.subscribe(Projects.userPublicationName);
    const sub5 = Meteor.subscribe(ProfilesClubs.userPublicationName);
    const sub6 = Meteor.subscribe(Clubs.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready() && sub6.ready(),
      user: Meteor.user(),
    };
  }, []);

  const testData = [{
    name: 'test1', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 1', goal: 'goal test 1', topics: ['good boys', 'and girls'],
  },
  {
    name: 'test2', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 2', goal: 'goal test 2', topics: ['good boys', 'and girls'],
  },
  {
    name: 'test3', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 3', goal: 'goal test 3', topics: ['good boys', 'and girls'],
  },
  {
    name: 'test3', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 3', goal: 'goal test 3', topics: ['good boys', 'and girls'],
  },
  {
    name: 'test3', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 3', goal: 'goal test 3', topics: ['good boys', 'and girls'],
  },
  {
    name: 'test3', abbreviation: 'ACM', image: 'https://github.com/cammoore.png', description: 'description test 3', goal: 'goal test 3', topics: ['good boys', 'and girls'],
  },
  ];

  const clubData = {
    clubs: [],
    ready: false,
  };
  if (ready) {
    const userProfilesClubs = ProfilesClubs.collection.find({ profileEmail: user.username }).fetch();
    const userClubNames = userProfilesClubs.map((profileClub) => profileClub.clubName);
    const clubs = userClubNames.map(clubName => Clubs.collection.find({ name: clubName }).fetch()[0]);
    clubData.clubs = clubs;
    clubData.ready = true;
  }
  return ready && clubData.ready ? (
    <Container style={pageStyle}>
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>My Clubs</h2>
          </Col>
          <Row xs={1} md={2} lg={4} className="g-4 justify-content-center m-auto">
            {clubData.clubs.map((club, index) => (<Col> <ClubCard key={index} club={club} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ProfilesPage;
