import { useState } from "react";
import Project from "./components/Project";
import DataControls from "./components/DataControls";
import CreateProjectModal from "./components/CreateProjectModal";
import { useProjects } from "../../hooks/useProjects";
import "./Projects.css";

export default function Projects() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const {
    projects,
    isLoading,
    error,
    sortValue,
    filterValue,
    onSearchChange,
    onSortChange,
    onFilterChange,
    refetch,
  } = useProjects();

  return (
    <div className="container">
      <div className="title">
        <h1>Projects</h1>
      </div>

      <div className="content">
        <DataControls
          onSearchChange={onSearchChange}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          sortValue={sortValue}
          filterValue={filterValue}
        />

        <div className="projects-grid">
          <div className="project-descriptions">
            <div>Name</div>
            <div>Deadline</div>
            <div>Progress</div>
          </div>

          {isLoading ? (
            <div className="loading-spinner">Pobieranie projektów z serwera...</div>
          ) : error ? (
            <div className="error-message">Błąd: {error}</div>
          ) : projects.length > 0 ? (
            <div className="projects">
              {projects.map((project) => (
                <Project key={project.id} project={project} onChanged={refetch} />
              ))}
            </div>
          ) : (
            <div className="no-projects">No projects found.</div>
          )}

          <div className="new-project" onClick={() => setIsCreateModalOpen(true)}>
            <p>Create a new project.</p>
          </div>
        </div>
      </div>

      <CreateProjectModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={refetch}
      />
    </div>
  );
}
