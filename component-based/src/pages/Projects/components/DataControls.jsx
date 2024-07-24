import React from "react";
import "./DataControls.css";

export default function DataControls({ onSearchChange }) {
  return (
    <div className="data-controls">
      <div className="show-completed-checkbox">
        <input type="checkbox" id="show-completed" name="show-completed" />
        <label htmlFor="show-completed">Show completed</label>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search projects" onChange={(e) => onSearchChange(e.target.value)}/>
      </div>

      <div className="filter">
        <select name="filter" id="filter">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="sorter">
        <select name="sorter" id="sorter">
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}
