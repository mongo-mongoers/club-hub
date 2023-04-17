import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubBanner = ({ club }) => (
  <div className="club-banner justify-content-md-center">
    <Row className="justify-content-center pt-5 pb-3">
      {club.topics.map((interest, index) => <Col xs="auto" className="mx-3"><div key={index} className="label">{interest}</div></Col>)}
    </Row>
    <Row className="justify-content-center align-middle text-center pb-5 text-white">
      <Col xs={5}>
        <h1>
          {club.name} ({club.abbreviation})
        </h1>
      </Col>
    </Row>
  </div>
);

// Require a document to be passed to this component.
ClubBanner.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    abbreviation: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    goals: PropTypes.string,
    email: PropTypes.string,
    logo: PropTypes.string,
  }).isRequired,
};

export default ClubBanner;
