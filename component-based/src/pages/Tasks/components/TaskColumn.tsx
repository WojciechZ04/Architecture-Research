import { useState } from "react";
import "./TaskColumn.css";
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModal";

interface TaskData {
  id: string;
  name: string;
  status: "Not started" | "In progress" | "Done";
  project_id: string;
  project_name?: string;
  deadline?: string;
  description?: string;
}

interface TaskColumnProps {
  value: "Not started" | "In progress" | "Done";
  tasks: TaskData[];
  fetchTasks: () => void;
}

export default function TaskColumn({ value, tasks, fetchTasks }: TaskColumnProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);

  const className =
    value === "Not started"
      ? "column to-do-column"
      : value === "In progress"
      ? "column in-progress-column"
      : value === "Done"
      ? "column done-column"
      : "column default-column";

  return (
    <div className={className}>
      <h2 className="label">{value}</h2>
      <hr />

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          fetchTasks={fetchTasks}
        />
      ))}

      <div className="create-task-section" onClick={handleOpen}>
        <p>Add a Task</p>
        <i className="material-icons">add</i>
      </div>
      
      <CreateTaskModal 
        open={open} 
        setOpen={setOpen} 
        taskStatus={value} 
        fetchTasks={fetchTasks}
      />
    </div>
  );
}