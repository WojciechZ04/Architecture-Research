import { useState, useEffect } from "react";
import Project from "../components/Project/Project";
import { Box } from "@mui/material";

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
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} className="projectsNav">
        <h1>Projects</h1>
      </Box>
      {projects && projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </div>
  );
}
