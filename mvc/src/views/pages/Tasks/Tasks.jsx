import React from "react";
import TaskColumn from "./components/TaskColumn";
import "./Tasks.css";
import { useTasksController } from "../../../controllers/TaskController";

export default function Tasks() {
  const { notStartedTasks, inProgressTasks, doneTasks, reloadTasks } = useTasksController();

  return (
    <div className="container">
      <div className="title">
        <h1>Your Tasks</h1>
      </div>
      <div className="control-panel"></div>
      <div className="task-columns">
        <TaskColumn
          value="Not started"
          tasks={notStartedTasks}
          fetchTasks={reloadTasks}
        />
        <TaskColumn
          value="In progress"
          tasks={inProgressTasks}
          fetchTasks={reloadTasks}
        />
        <TaskColumn
          value="Done"
          tasks={doneTasks}
          fetchTasks={reloadTasks}
        />
      </div>
    </div>
  );
}
