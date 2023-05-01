import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';
import { PageIDs } from '../utilities/ids';
import { Events } from '../../api/events/Events';
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
const OwnerEventsPage = () => {

  const { ready, eventData } = useTracker(() => {
    // Get access to Club data and Bookmarks.
    const sub1 = Meteor.subscribe(Events.userPublicationName);
    const userEmail = Meteor.user().username;
    const allEvents = Events.collection.find({}).fetch();
    console.log(allEvents);
    const events = allEvents.filter(event => event.email === userEmail);
    console.log(events);
    return {
      ready: sub1.ready(),
      eventData: events,
    };
  }, []);
  return ready ? (
    <Container id={PageIDs.eventsPage} className="align-content-center mx-0 px-0">
      <div className="club-banner justify-content-center min-vw-100">
        <Row className="justify-content-center align-middle text-center py-5 text-white">
          <Col xs={5}>
            <h1>
              Your Organizations Events
            </h1>
          </Col>
        </Row>
      </div>
      <Row xs={1} md={1} lg={1} className="gap-4 justify-content-center mx-0 my-5 min-vw-100">
        {eventData.map((event, index) => (<Col> <EventCard key={index} event={event} /></Col>))}
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default OwnerEventsPage;