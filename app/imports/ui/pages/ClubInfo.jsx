import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';
import { Clubs } from '../../api/clubs/Clubs';
import ClubBanner from '../components/ClubInfoBanner';
import ClubBody from '../components/ClubInfoBody';

/* A simple static component to render some text for the landing page. */
const ClubInfo = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { clubAbv } = useParams();

  const { ready, club } = useTracker(() => {
    // Get access to Club data.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const data = Clubs.collection.findOne({ abbreviation: clubAbv });
    return {
      ready: rdy,
      club: data,
    };
  }, []);
  // const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
  // There is a potential race condition. We might not be ready at this point.
  // Need to ensure that getProfileData doesn't throw an error on line 18.
  /*
  const testData = {
    name: 'Association for Computing Machinery',
    abbreviation: 'ACM',
    topics: ['ACManoa', 'Service'],
    email: 'acmmanoa@hawaii.edu',
    description:
      'The Association for Computing Machinery at UH Manoa (ACManoa/ACM) is a global scientific and educational organization dedicated to advancing the art, ' +
      'science, engineering, and application of computing, serving both professional and public interests by fostering the open exchange of information and by promoting the highest professional and ethical standards.',
    goal: 'The main goals of the organization is to promote professional and technical development, facilitate networking, and enrich the lives of the organization members.',
    logo: 'https://avatars.githubusercontent.com/u/17691904?s=280&v=4',
  };
   */
  return ready ? (
    <Container id={PageIDs.acmanoa} className="align-content-center mx-0 px-0 min-vw-100">
      <div>
        <ClubBanner club={club} />
      </div>
      <div>
        <ClubBody club={club} />
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default ClubInfo;
