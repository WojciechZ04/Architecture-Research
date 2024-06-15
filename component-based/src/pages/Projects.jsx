import { Container } from "@mui/material";
import Project from "../components/Project/Project";

export default function Projects() {
  return (
    <Container>
      <h1 className="centered">Projects</h1>
      <Project />
	  <Project />
    </Container>
  );
}
