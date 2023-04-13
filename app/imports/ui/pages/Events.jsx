import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { PageIDs } from '../utilities/ids';
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
const EventsPage = () => {

  const { ready } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = Meteor.subscribe(Profiles.userPublicationName);
    const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
    const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
    const sub4 = Meteor.subscribe(Projects.userPublicationName);
    return {
      ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
    };
  }, []);
  // const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.

  const testData = [{
    club: 'ACM',
    name: 'Computer Science Career Fair!',
    date: '3/31/23',
    description:
      'Attend this career fair for a great opportunity to network, learn about job or internship openings, and make connections with industry professionals! This' +
      'event will be held on Friday, March 31st from 2pm - 4pm on the 3rd Floor of the Pacific Ocean Science & Technology (POST) Building. This Career Fair will' +
      'conclude the Hawai\'i Tech Days of Spring which is a series of events dedicated to the Technology, IT, and Intelligence sectors with local and national' +
      'industry partners.',
    location: '3rd Floor of the Pacific Ocean Science & Technology (POST) Building',
  },
  {
    club: 'ACM',
    name: 'Event-2',
    date: '6/01/23',
    description: 'description test 2',
    location: 'Campus Center',
  },
  {
    club: 'FF',
    name: 'Event-3',
    date: '7/01/23',
    description: 'description test 3',
    location: 'Campus Center',
  },
  ];
  return ready ? (
    <Container id={PageIDs.eventsPage} className="align-content-center mx-0 px-0">
      <div className="club-banner justify-content-center min-vw-100">
        <Row className="justify-content-center align-middle text-center py-5 text-white">
          <Col xs={5}>
            <h1>
              Events
            </h1>
          </Col>
        </Row>
      </div>
      <Row xs={1} md={1} lg={1} className="gap-4 justify-content-center mx-0 my-5 min-vw-100">
        {testData.map((event, index) => (<Col> <EventCard key={index} event={event} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EventsPage;
