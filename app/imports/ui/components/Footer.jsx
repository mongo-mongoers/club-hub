import React from 'react';
import { Col, Container } from 'react-bootstrap';

/* The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center" style={{ color: 'white' }}>
        The Club Hub Project
        {' '}
        <br />
        &copy; 2023 Mongo-Mongoers.
        <br />
        All rights reserved.
      </Col>
    </Container>
  </footer>
);

export default Footer;
