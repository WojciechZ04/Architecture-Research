import { Container } from "@mui/material";
import TaskColumn from "../components/TaskColumn/TaskColumn";
import "./Tasks.css";

export default function Tasks() {
  return (
    <Container >
      <div className="task-columns">
        <TaskColumn value="To do" />
        <TaskColumn value="In progress" />
        <TaskColumn value="Done" />
      </div>
    </Container>
  );
}
