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

export default function CreateTaskModal({
  open,
  setOpen,
  taskStatus,
  fetchTasks,
}) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [deadline, setDeadline] = useState("");

  if (!open) return null;
  const handleCreateTask = async () => {
    const response = await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: taskName,
        description: taskDescription,
        projectId: projectId,
        status: taskStatus,
        deadline: deadline,
      }),
    });

    if (response.ok) {
      handleClose();
      setTaskName("");
      setTaskDescription("");
      setProjectId("");
      fetchTasks();
    } else {
      console.error("Failed to create task");
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Create task</h2>
        <Input
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
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
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateTask}>Create</Button>
      </Box>
    </Modal>
  );
}
