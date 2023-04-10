import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import ClubBanner from '../components/ClubInfoBanner';
import ClubBody from '../components/ClubInfoBody';

/* A simple static component to render some text for the landing page. */
const ACManoa = () => {

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

  const testData = {
    name: 'Association for Computing Machinery',
    abbreviation: 'ACM',
    topics: ['ACManoa', 'Service'],
    email: 'acmmanoa@hawaii.edu',
    description:
      'Attend this career fair for a great opportunity to network, learn about job or internship openings, and make connections with industry professionals! This' +
      'event will be held on Friday, March 31st from 2pm - 4pm on the 3rd Floor of the Pacific Ocean Science & Technology (POST) Building. This Career Fair will' +
      'conclude the Hawai\'i Tech Days of Spring which is a series of events dedicated to the Technology, IT, and Intelligence sectors with local and national' +
      'industry partners.',
    goal: '3rd Floor of the Pacific Ocean Science & Technology (POST) Building',
    logo: 'https://avatars.githubusercontent.com/u/17691904?s=280&v=4',
  };
  return ready ? (
    <Container id={PageIDs.acmanoa} className="align-content-center mx-0 px-0 min-vw-100">
      <div>
        <ClubBanner club={testData} />
      </div>
      <div>
        <ClubBody club={testData} />
      </div>
    </Container>
  ) : <LoadingSpinner />;
};

export default ACManoa;
