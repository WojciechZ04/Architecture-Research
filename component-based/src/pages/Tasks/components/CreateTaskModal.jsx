import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./Modal.css";

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
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };

    fetchProjects();
  }, []);

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
      setDeadline("");
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
      <Box className="modal">
        <h2>Create task</h2>
        <Input
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <br />
        <Select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select Project
          </MenuItem>
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
        <br />
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <br />
        <label>Description:</label>
        <TextareaAutosize
          minRows={4}
          placeholder="(optional)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask}>Create</Button>
        </div>
      </Box>
    </Modal>
  );
}
