import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ClubBody = ({ club }) => (
  <div className="bg-white pt-5">
    <Row className="px-3 justify-content-center">
      <Col xs={8}>
        <h3>
          What is {club.abbreviation}?
        </h3>
        <p className="py-2">
          {club.description}
        </p>
        <h3>
          What are the goals of {club.abbreviation}?
        </h3>
        <p className="py-2">
          {club.goals}
        </p>
        <h3>
          Questions, Comments, Concerns?
        </h3>
        <p className="py-2">
          For all inquires and concerns, please contact us at {club.email}
        </p>
      </Col>
    </Row>
    <Row className="justify-content-center my-5">
      <Col xs={3} className="text-center">
        <Image src={`../${club.logo}`} alt="ACM logo" width={400} />
      </Col>
    </Row>
  </div>
);

// Require a document to be passed to this component.
ClubBody.propTypes = {
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

export default ClubBody;
