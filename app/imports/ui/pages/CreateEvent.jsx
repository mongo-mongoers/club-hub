import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { createEventMethod } from '../../startup/both/Methods';

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

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const newData = { ...data, club: data.club };

    Meteor.call(createEventMethod, newData, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      }
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="club" /></Col>
                  <Col><TextField name="name" /></Col>
                </Row>
                <Row>
                  <LongTextField name="description" />
                </Row>
                <Row>
                  <LongTextField name="date" />
                </Row>
                <Row>
                  <TextField name="email" />
                  <TextField name="location" />
                </Row>
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateEvent;
