import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router-dom';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  const handleLogout = () => {
    // Wait for logout process to complete before redirecting and refreshing
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  Meteor.logout(handleLogout);

  return (
    <Navigate to="/" />
  );
};
export default SignOut;
