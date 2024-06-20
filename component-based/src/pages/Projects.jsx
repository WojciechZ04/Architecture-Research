import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Project from "../components/Project/Project";

export default function Projects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.project);
        console.log("Data fetched:", data.project);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Container>
      <h1 className="centered">Projects</h1>
      {projects && projects.map((project, index) => (
        <Project key={index} project={project} />
      ))}
    </Container>
  );
}
