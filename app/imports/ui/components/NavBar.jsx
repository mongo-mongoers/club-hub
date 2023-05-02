import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '../utilities/ids';
import { Clubs } from '../../api/clubs/Clubs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { isOwner, currentUser, loggedIn } = useTracker(() => {
    const sub1 = Meteor.subscribe(Clubs.userPublicationName);
    let hasEvent = [];
    if (sub1.ready()) {
      const userEmail = Meteor.user().username;
      hasEvent = Clubs.collection.findOne({ email: userEmail });
    }
    return {
      isOwner: hasEvent,
      currentUser: Meteor.user() ? Meteor.user().username : '',
      loggedIn: !!Meteor.user(),
    };
  }, []);
  const menuStyle = { marginBottom: '0px' };
  const navbarClassName = loggedIn ? 'bg-dark' : 'bg-light';
  return (
    <Navbar expand="lg" style={menuStyle} className={navbarClassName}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}><Image src="/images/logo.png" width={50} style={{ marginBottom: 3 }} /> Club-Hub</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto justify-content-start">
            <Nav.Link as={NavLink} id={ComponentIDs.clubListMenuItem} to="/clubList" key="clubList">Club List</Nav.Link>
            {currentUser ? (
              [<Nav.Link as={NavLink} id={ComponentIDs.myClubsMenuItem} to="/bookmarks" key="bookmarks">Bookmarks</Nav.Link>,
                <Nav.Link as={NavLink} id={ComponentIDs.eventsMenuItem} to="/events" key="events">Events</Nav.Link>]
            ) : ''}
            {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Nav.Link as={NavLink} id={ComponentIDs.createClubsMenuItem} to="/createClub" key="createClubs">Create Club</Nav.Link>
            ) : ''}
            {(isOwner && currentUser) ? (
              <Nav.Link as={NavLink} id={ComponentIDs.createClubsMenuItem} to="/YourEvents" key="Your Events">Manage Your Events</Nav.Link>
            ) : ''}
          </Nav>
          <Nav className="justify-content-end">
            {currentUser === '' ? (
              <NavDropdown id={ComponentIDs.loginDropdown} title="Login">
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignIn} as={NavLink} to="/signin">
                  <PersonFill />
                  Sign
                  in
                </NavDropdown.Item>
                <NavDropdown.Item id={ComponentIDs.loginDropdownSignUp} as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign
                  up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id={ComponentIDs.currentUserDropdown} title={currentUser}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} as={NavLink} to="/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign
                  out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
