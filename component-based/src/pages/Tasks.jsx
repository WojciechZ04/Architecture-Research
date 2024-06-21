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
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => {
        const tasks = (data.project || []).flatMap(
          (project) => project.tasks || []
        );
        setTasks(tasks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const notStartedTasks = tasks
    ? tasks.filter((task) => task.status === "not started")
    : [];
  const inProgressTasks = tasks
    ? tasks.filter((task) => task.status === "in progress")
    : [];
  const doneTasks = tasks ? tasks.filter((task) => task.status === "done") : [];

  return (
    <Container>
      <h1 className="centered">Your Tasks</h1>
      <div className="task-columns">
        <TaskColumn
          value="To do"
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
