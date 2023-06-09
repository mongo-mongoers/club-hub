import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { createClubMethod } from '../../startup/both/Methods';
import slugify from '../../api/methods/slug';
import { ComponentIDs, PageIDs } from '../utilities/ids';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: { type: String },
  abbreviation: { type: String },
  topics: { type: Array }, 'topics.$': {
    type: String,
    allowedValues: ['Academic', 'Social', 'ICS', 'Service', 'Leisure', 'Professional', 'Engineering', 'Recreational'],
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
    <Container id={PageIDs.createClubPage} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create Club</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id={ComponentIDs.createClubFormName} name="name" /></Col>
                  <Col><TextField id={ComponentIDs.createClubFormAbbreviation} name="abbreviation" /></Col>
                </Row>
                <Row>
                  <LongTextField id={ComponentIDs.createClubFormDescription} name="description" />
                </Row>
                <Row>
                  <LongTextField id={ComponentIDs.createClubFormGoals} name="goals" />
                </Row>
                <Row>
                  <TextField id={ComponentIDs.createClubFormEmail} name="email" />
                  <TextField id={ComponentIDs.createClubFormLogo} name="logo" />
                </Row>
                <Row>
                  <SelectField id={ComponentIDs.createClubFormTopics} name="topics" />
                </Row>
                <SubmitField id={ComponentIDs.createClubFormSubmit} value="Submit" />
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
