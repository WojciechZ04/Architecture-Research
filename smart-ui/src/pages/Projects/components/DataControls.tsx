import { TextField, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import "./DataControls.css";

interface DataControlsProps {
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  sortValue: string;
  filterValue: string;
}

export default function DataControls({
  onSearchChange,
  onSortChange,
  onFilterChange,
  sortValue,
  filterValue,
}: DataControlsProps) {
  return (
    <div className="data-controls">
      <div className="search-bar">
        <TextField
          type="text"
          placeholder="Search projects"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter">
        <Select
          value={filterValue}
          onChange={(e: SelectChangeEvent) => onFilterChange(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </div>

      <div className="sorter">
        <Select
          value={sortValue}
          onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}
        >
          <MenuItem value="date-asc">Date (Ascending)</MenuItem>
          <MenuItem value="date-desc">Date (Descending)</MenuItem>
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
        </Select>
      </div>
    </div>
  );
}