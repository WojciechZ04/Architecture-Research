import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Project from "./components/Project";
import DataControls from "./components/DataControls";
import CreateProjectModal from "./components/CreateProjectModal";
import "./Projects.css";

export default function Projects(props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const onSortChange = (value) => {
    const sortedProjects = [...projects].sort((a, b) => {
      let fieldA, fieldB;
      const [criteria, direction] = value.split("-");

      if (criteria === "date") {
        fieldA = new Date(a.deadline);
        fieldB = new Date(b.deadline);
      } else if (criteria === "name") {
        fieldA = a.name.toLowerCase();
        fieldB = b.name.toLowerCase();
      }

      if (direction === "asc") {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    });

    setProjects(sortedProjects);
  };

  const filteredProjects =
    projects &&
    projects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container">
      <div className="title">
        <h1>Projects</h1>
      </div>

      <div className="content">
        <DataControls
          onSearchChange={handleSearchChange}
          onSortChange={onSortChange}
        />

        <div className="projects">
          <div className="project-descriptions">
            <div>Name</div>
            <div>Deadline</div>
            <div>Progress</div>
          </div>
          {filteredProjects.length > 0 ? (
            <div className="projects">
              {filteredProjects.map((project, index) => (
                <Link key={project.id} to={`/projects/${project.id}`} className="project-link">
                  <Project key={index} project={project} />
                </Link>
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
        fetchProjects={fetchProjects}
      />
    </div>
  );
}
