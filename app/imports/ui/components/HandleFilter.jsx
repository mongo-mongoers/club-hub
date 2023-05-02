import React, { useState } from 'react';
import Filter from './Filter';

const HandleFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (newFilter) => {
    setSelectedFilter(newFilter);
  };

  // Render your UI here, including the Filter component with options and onChange props:
  return (
    <div>
      <Filter options={['Academic', 'Social', 'ICS', 'Service', 'Leisure', 'Professional', 'Engineering', 'Recreational']} onChange={handleFilterChange} />
      {/* Render other components based on the selected filter */}
    </div>
  );
};

export default HandleFilter;
