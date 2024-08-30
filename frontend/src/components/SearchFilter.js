import React, { useState } from 'react';
import './SearchFilter.css'

const SearchFilter = ({ onSearchFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearchFilter(e.target.value, status);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    onSearchFilter(searchTerm, e.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by course name..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select value={status} onChange={handleStatusChange}>
        <option value="">All</option>
        <option value="Open">Open</option>
        <option value="Closed">Closed</option>
        <option value="In Progress">In Progress</option>
      </select>
    </div>
  );
};

export default SearchFilter;
