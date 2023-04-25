import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { Clubs } from '../../api/clubs/Clubs';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import Projects from '../pages/Projects';
import Interests from '../pages/Interests';
import AddProject from '../pages/AddProject';
import EventsPage from '../pages/Events';
import ClubInfo from '../pages/ClubInfo';
import ProfilesPage from '../pages/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import CreateClub from '../pages/CreateClub';
import ClubList from '../pages/ClubList';
import EditClub from '../pages/EditClub';
import CreateEvent from '../pages/CreateEvent';

/* Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/clubList" element={<ClubList />} />
          <Route path="/clubInfo/:clubSlug" element={<ClubInfo />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/addProject" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><ProfilesPage /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="/createClub" element={<AdminProtectedRoute ready={ready}><CreateClub /></AdminProtectedRoute>} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/clubEdit/:clubSlug" element={<AdminOrOwnerProtectedRoute ready={ready}><EditClub /></AdminOrOwnerProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

const AdminOrOwnerProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  const { clubSlug } = useParams(); // Get the clubSlug from the route params

  const { isAdmin, isOwner, ready2 } = useTracker(() => {
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    const rdy2 = subscription.ready();
    const club = Clubs.collection.findOne({ slug: clubSlug }); // Find the club using clubSlug
    const role = Roles.userIsInRole(Meteor.userId(), 'admin');
    const user = Meteor.user().username === club.email;
    return {
      ready2: rdy2,
      isAdmin: role,
      isOwner: user,
    };
  });

  if (!isLogged) {
    return <Navigate to="/signin" />;
  }

  if (!ready || !ready2) {
    return <LoadingSpinner />;
  }

  return (isAdmin || isOwner) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

AdminOrOwnerProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminOrOwnerProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
