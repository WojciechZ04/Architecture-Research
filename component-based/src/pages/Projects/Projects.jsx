import { useState, useEffect } from "react";
import Project from "./components/Project";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        console.log("Data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>Projects</h1>
      </div>

      <div className="content">
        <div className="data-controls">
          <div className="show-completed-checkbox">
            <input type="checkbox" id="show-completed" name="show-completed" />
            <label htmlFor="show-completed">Show completed</label>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search projects" />
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

        <div className="projects">
          <div className="project-descriptions">
            <div>Name</div>
            <div>Deadline</div>
            <div>Progress</div>
          </div>
          {projects &&
            projects.map((project, index) => (
              <Project key={index} project={project} />
            ))}
        </div>
      </div>
    </div>
  );
}
