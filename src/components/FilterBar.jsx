import React from "react";
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

const FilterBar = ({ setFilter }) => {
  const handleStatusChange = (e) => {
    setFilter((prev) => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilter((prev) => ({ ...prev, priority: e.target.value }));
  };

  return (
    <div className="filter-bar">
      <select onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <select onChange={handlePriorityChange}>
        <option value="all">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

FilterBar.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export default FilterBar;
