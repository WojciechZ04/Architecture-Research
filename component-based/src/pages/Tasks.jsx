import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import TaskColumn from "../components/TaskColumn/TaskColumn";
import "./Tasks.css";

export default function Tasks(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const notStartedTasks = tasks
    ? tasks.filter((task) => task.status === "Not started")
    : [];
  const inProgressTasks = tasks
    ? tasks.filter((task) => task.status === "In progress")
    : [];
  const doneTasks = tasks ? tasks.filter((task) => task.status === "Done") : [];

  return (
    <Container>
      <h1 className="centered">Your Tasks</h1>
      <div className="task-columns">
        <TaskColumn
          value="Not started"
          tasks={notStartedTasks}
          fetchTasks={fetchTasks}
        />
        <TaskColumn
          value="In progress"
          tasks={inProgressTasks}
          fetchTasks={fetchTasks}
        />
        <TaskColumn value="Done" tasks={doneTasks} fetchTasks={fetchTasks} />
      </div>
    </Container>
  );
}
