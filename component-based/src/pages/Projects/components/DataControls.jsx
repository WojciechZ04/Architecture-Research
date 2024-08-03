import React from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import "./DataControls.css";

export default function DataControls({ onSearchChange, onSortChange, onFilterChange, sortValue, filterValue }) {
  return (
    <div className="data-controls">
      <div className="show-completed-checkbox">
        <input type="checkbox" id="show-completed" name="show-completed" />
        <label htmlFor="show-completed">Show completed</label>
      </div>

      <div className="search-bar">
        <TextField type="text" placeholder="Search projects" onChange={(e) => onSearchChange(e.target.value)}/>
      </div>

      <div className="filter">
        <Select name="filter" id="filter" value={filterValue} onChange={(e) => onFilterChange(e.target.value)}>
          <MenuItem  value="all">All</MenuItem>
          <MenuItem  value="active">Active</MenuItem>
          <MenuItem  value="completed">Completed</MenuItem>
        </Select>
      </div>

      <div className="sorter">
        <Select name="sorter" id="sorter" value={sortValue} onChange={(e) => onSortChange(e.target.value)}>
          <MenuItem value="date-asc">Date (Ascending)</MenuItem>
          <MenuItem value="date-desc">Date (Descending)</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
        </Select>
      </div>
    </div>
  );
}
