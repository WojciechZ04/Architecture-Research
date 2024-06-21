import "./TaskColumn.css";
import Task from "./Task/Task";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TaskColumn(props) {
  const [open, setOpen] = React.useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const taskStatus = props.value;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: taskTitle,
        description: taskDescription,
        projectId: projectId,
        status: taskStatus,
      }),
    });
    
    if (response.ok) {
      handleClose();
      setTaskTitle('');
      setTaskDescription('');
      setProjectId('');
      props.fetchTasks();
    } else {
      console.error('Failed to create task');
    }
  };

  const className =
    props.value === "Not started"
      ? "column to-do-column"
      : props.value === "In progress"
      ? "column in-progress-column"
      : props.value === "Done"
      ? "column done-column"
      : "column default-column";

  return (
    <div className={className}>
      <h2 className="label">{props.value}</h2>
      <hr />
      
      {props.tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}

      <button className="centered" onClick={handleOpen}>New task</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>Create task</h2>
          <Input 
            placeholder="Task title" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
          />
          <Input 
            placeholder="Task description" 
            value={taskDescription} 
            onChange={(e) => setTaskDescription(e.target.value)} 
          />
          <Input 
            placeholder="Project id" 
            value={projectId} 
            onChange={(e) => setProjectId(e.target.value)} 
          />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask}>Create</Button>
        </Box>
      </Modal>
    </div>
  );
}
