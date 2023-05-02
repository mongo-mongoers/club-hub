import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import ClubCard from './ClubCard';
import { Clubs } from '../../api/clubs/Clubs';

const Filter = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    onChange(newOption);
  };

  const toggleBookmark = (clubId, bookmarked) => {
    Clubs.updateBookmark(clubId, !bookmarked);
  };
  return (
    <div>
      <label>Filter by: </label>
      <select
        id="filter-select"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">All</option>
        {options.map((club, index) => (
          <Col key={index} className="d-flex align-items-stretch">
            <ClubCard key={index} club={club} bookmarked={club.bookmarked} toggleBookmark={toggleBookmark} />
          </Col>
        ))}
      </select>
    </div>
  );
};

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
