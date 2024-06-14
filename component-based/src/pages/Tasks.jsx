import { Container } from "@mui/material";
import TaskColumn from "../components/TaskColumn/TaskColumn";
import tasksData from "../assets/tasks";
import "./Tasks.css";

export default function Tasks(props) {

  const todoTasks = tasksData.filter(task => task.status === 'To do');
  const inProgressTasks = tasksData.filter(task => task.status === 'In progress');
  const doneTasks = tasksData.filter(task => task.status === 'Done');


  return (
    <Container >
      <div className="task-columns">
        <TaskColumn value="To do" tasks={todoTasks}/>
        <TaskColumn value="In progress" tasks={inProgressTasks}/>
        <TaskColumn value="Done" tasks={doneTasks}/>
      </div>
    </Container>
  );
}
