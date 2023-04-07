import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const ACManoa = () => (
  <Container id={PageIDs.acmanoa} className="align-content-center mx-0 px-0 min-vw-100">
    <div className="club-banner justify-content-md-center">
      <Row className="justify-content-center pt-5 pb-3">
        <Col xs="auto">
          <div className="label">ACManoa</div>
        </Col>
        <Col xs="auto" />
        <Col xs="auto">
          <div className="label">Service</div>
        </Col>
      </Row>
      <Row className="justify-content-center align-middle text-center pb-5 text-white">
        <Col xs={5}>
          <h1>
            Association for Computing Machinery (ACM)
          </h1>
        </Col>
      </Row>
    </div>
    <div className="bg-white pt-5">
      <Row className="px-3 justify-content-center">
        <Col xs={8}>
          <h3>
            What is ACM?
          </h3>
          <p className="py-2">
            The Association for Computing Machinery at UH Manoa (ACManoa/ACM) is a global scientific and educational
            organization dedicated to advancing the art, science, engineering, and application of computing, serving both
            professional and public interests by fostering the open exchange of information and by promoting the highest
            professional and ethical standards.
          </p>
          <h3>
            What are the goals of ACM?
          </h3>
          <p className="py-2">
            The main goals of the organization is to promote professional and technical development,
            facilitate networking, and enrich the lives of the organization members.
          </p>
          <h3>
            Questions, Comments, Concerns?
          </h3>
          <p className="py-2">
            For all inquires and concerns, please contact us at acmmanoa@hawaii.edu
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center my-5">
        <Col xs={3} className="text-center">
          <Image src="/images/acmanoa.png" alt="ACManoa" width={400} />
        </Col>
      </Row>
    </div>
  </Container>
);

export default ACManoa;
