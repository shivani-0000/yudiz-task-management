import React from "react";
import PropTypes from "prop-types";
import "../styles/FilterBar.css";

const FilterBar = ({ setFilter }) => {
  const handleCompletionChange = (e) => {
    setFilter((prev) => ({ ...prev, completion: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilter((prev) => ({ ...prev, status: e.target.value }));
  };

  const handlePriorityChange = (e) => {
    setFilter((prev) => ({ ...prev, priority: e.target.value }));
  };

  return (
    <div className="filter-bar">
      {/* Completion Filter */}
      <select className="filter-bar-select" onChange={handleCompletionChange}>
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>

      {/* Status Filter */}
      <select className="filter-bar-select" onChange={handleStatusChange}>
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* Priority Filter */}
      <select className="filter-bar-select" onChange={handlePriorityChange}>
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
