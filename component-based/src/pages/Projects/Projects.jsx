import { useState, useEffect } from "react";
import Project from "./components/Project";
import DataControls from "./components/DataControls";
import CreateProjectModal from "./components/CreateProjectModal";
import "./Projects.css";

export default function Projects(props) {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortValue, setSortValue] = useState("date-asc");
  const [filterValue, setFilterValue] = useState("all");

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const sortedData = sortProjects(data, sortValue);
        setProjects(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const sortProjects = (projects, value) => {
    return projects.sort((a, b) => {
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
  };

  const onSortChange = (value) => {
    setSortValue(value);
    const sortedProjects = sortProjects([...projects], value);
    setProjects(sortedProjects);
  };

  const onFilterChange = (value) => {
    setFilterValue(value);
  };

  const getProjectStatus = (project) => {
    if (project.tasks.length > 0 && project.tasks.every(task => task.status === "Done")) {
      return "completed";
    }
    if (project.tasks.length > 0 && project.tasks.some(task => task.status === "In progress" || task.status === "Done") && !project.tasks.every(task => task.status === "Done")) {
      return "active";
    }
    return "inactive"; // Default status if no tasks or other conditions
  };
  
  const projectsWithStatus = projects.map(project => ({
    ...project,
    status: getProjectStatus(project)
  }));

  const filteredProjects = projectsWithStatus.filter((project) => {
    if (filterValue === "all") return true;
    if (filterValue === "completed") {
      return project.tasks.length > 0 && project.tasks.every(task => task.status === "Done");
    }
    if (filterValue === "active") 
    {
      return project.tasks.length > 0 && project.tasks.some(task => task.status === "In progress" || task.status === "Done") && !project.tasks.every(task => task.status === "Done");
    }
    return true;
  });

  const searchedProjects =
    filteredProjects &&
    filteredProjects.filter((project) =>
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
          onFilterChange={onFilterChange}
          sortValue={sortValue}
          filterValue={filterValue}
        />

        <div className="projects">
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
        fetchProjects={fetchProjects}
      />
    </div>
  );
}
