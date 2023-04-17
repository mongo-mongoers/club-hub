import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { createClubMethod } from '../../startup/both/Methods';
import slugify from '../../api/methods/slug';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: { type: String },
  abbreviation: { type: String },
  topics: { type: Array }, 'topics.$': {
    type: String,
    allowedValues: ['Academic', 'Social', 'ICS', 'Service'],
  },
  description: { type: String },
  goals: { type: String },
  email: { type: String },
  logo: { type: String },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the CreateClub page for adding a document. */
const CreateClub = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    // const { name, abbreviation, topics, description, goals, email, logo } = data;
    // const owner = Meteor.user().username;
    const newData = { ...data, slug: slugify(data.name) };

    Meteor.call(createClubMethod, newData, (error) => {
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
          <Col className="text-center"><h2>Create Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="abbreviation" /></Col>
                </Row>
                <Row>
                  <LongTextField name="description" />
                </Row>
                <Row>
                  <LongTextField name="goals" />
                </Row>
                <Row>
                  <TextField name="email" />
                  <TextField name="logo" />
                </Row>
                <Row>
                  <SelectField name="topics" />
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

export default CreateClub;
