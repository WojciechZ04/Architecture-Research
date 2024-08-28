import React from "react";
import {
  Box,
  Button,
  Modal,
  MenuItem,
  Select,
  Checkbox,
  TextField,
} from "@mui/material";
import "../../../components/Modal.css";
import { useCreateTaskController } from "../../../../controllers/TaskController";

export default function CreateTaskModal({
  open,
  setOpen,
  taskStatus,
  fetchTasks,
}) {
  const {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    projectId,
    setProjectId,
    taskDeadline,
    setTaskDeadline,
    hasDeadline,
    setHasDeadline,
    projects,
    error,
    handleCreateTask,
  } = useCreateTaskController();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const success = await handleCreateTask(taskStatus, fetchTasks);
    if (success) {
      handleClose();
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h2>Create task</h2>
        <TextField
          label="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
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
        <label className="custom-checkbox">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => setHasDeadline(e.target.checked)}
            sx={{
              color: "var(--neutral-color)",
              "&.Mui-checked": {
                color: "var(--neutral-color)",
              },
            }}
          />
          <span>Set a finish date</span>
        </label>
        {hasDeadline && (
          <TextField
            sx={{ marginTop: "10px" }}
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
        )}
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </Box>
    </Modal>
  );
}
