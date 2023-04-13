import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '../utilities/ids';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-banner">
      <div className="overlay">
        <Row className="align-content-center h-100">
          <Col className="text-center">
            <h1 style={{ paddingTop: '20px', color: 'white', fontSize: '36pt' }}>
              Welcome to Club Hub
            </h1>
            <h3 style={{ paddingBottom: '20px', color: 'white' }}>
              Discover, Connect, and Thrive: Your One-Stop Destination for Campus Clubs and Activities
            </h3>
          </Col>
        </Row>
      </div>
    </div>
    <div className="landing-white-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: '#376551' }}>Create an account and discover new clubs at UH Manoa!</h2>
        <Row md={1} lg={1}>
          <Col xs={6}>
            <Image src="/images/clublist-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-green-background">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>Learn about the clubs and bookmark any that catch your interests!</h2>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/interests-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/club-info-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center">
      <h2 style={{ color: '#376551' }}>
        Connect with others and participate in upcoming events!
      </h2>
      <Container>
        <Row md={1} lg={2}>
          <Col xs={6}>
            <Image src="/images/add-project-page.png" width={500} />
          </Col>
          <Col xs={6}>
            <Image src="/images/projects-page.png" width={500} />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default Landing;
