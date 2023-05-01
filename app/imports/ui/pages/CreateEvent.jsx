import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Navigate } from 'react-router-dom';
import { createEventMethod } from '../../startup/both/Methods';
import { Clubs } from '../../api/clubs/Clubs';
import LoadingSpinner from '../components/LoadingSpinner';
import { ComponentIDs } from '../utilities/ids';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  club: { type: String },
  name: { type: String },
  date: { type: String },
  description: { type: String },
  email: { type: String },
  location: { type: String },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the CreateClub page for adding a document. */
const CreateEvent = () => {
  const [redirect, setRedirect] = useState(false);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { clubSlug } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Clubs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Clubs.collection.findOne({ slug: clubSlug });
    const objName = { club: document.name, email: document.email };
    return {
      doc: objName,
      ready: rdy,
    };
  }, [clubSlug]);
  // On submit, insert the data.
  const submit = (data, formRef) => {

    Meteor.call(createEventMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event added successfully', 'success');
        formRef.reset();
        setRedirect(true);
      }
    });
  };
  if (redirect) {
    return (<Navigate to="/clubList" />);
  }
  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="club" /></Col>
                  <Col><TextField id={ComponentIDs.addEventFormName} name="name" /></Col>
                </Row>
                <Row>
                  <LongTextField id={ComponentIDs.addEventFormDescription} name="description" />
                </Row>
                <Row>
                  <LongTextField id={ComponentIDs.addEventFormDate} name="date" />
                </Row>
                <Row>
                  <TextField id={ComponentIDs.addEventFormEmail} name="email" />
                  <TextField id={ComponentIDs.addEventFormLocation} name="location" />
                </Row>
                <SubmitField id={ComponentIDs.addEventFormSubmit} value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default CreateEvent;
