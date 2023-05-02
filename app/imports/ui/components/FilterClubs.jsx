import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';


const FilterClubs = ({ options, onChange }) => {
  return (
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label>Filter by Topic</Form.Label>
      <Form.Control as="select" onChange={onChange}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

FilterClubs.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterClubs;
