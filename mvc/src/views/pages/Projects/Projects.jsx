// Projects.jsx

import { useState, useEffect, useCallback } from "react";
import Project from "./components/Project";
import DataControls from "./components/DataControls";
import CreateProjectModal from "./components/CreateProjectModal";
import { fetchProjects, filterAndSearchProjects } from "../../../controllers/ProjectController";
import "./Projects.css";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("date-asc");
  const [filterValue, setFilterValue] = useState("all");

  const handleOpen = () => setOpen(true);

  const fetchAndSetProjects = useCallback(() => {
    fetchProjects(sortValue, setProjects);
  }, [sortValue]);

  useEffect(() => {
    fetchAndSetProjects();
  }, [fetchAndSetProjects]);

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleSortChange = (value) => setSortValue(value);

  const handleFilterChange = (value) => setFilterValue(value);

  const searchedProjects = filterAndSearchProjects(projects, filterValue, searchTerm);

  return (
    <div className="container">
      <div className="title">
        <h1>Projects</h1>
      </div>

      <div className="content">
        <DataControls
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          sortValue={sortValue}
          filterValue={filterValue}
        />

        <div className="projects-grid">
          <div className="project-descriptions">
            <div>Name</div>
            <div>Deadline</div>
            <div>Progress</div>
          </div>
          {searchedProjects.length > 0 ? (
            <div className="projects">
              {searchedProjects.map((project, index) => (
                <Project key={index} project={project} />
              ))}
            </div>
          ) : (
            <div className="no-projects">No projects found.</div>
          )}
          <div className="new-project" onClick={handleOpen}>
            <p>Create a new project.</p>
          </div>
        </div>
      </div>
      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        fetchProjects={fetchAndSetProjects}
      />
    </div>
  );
}
