import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { handleEditProject } from '../../../../controllers/ProjectController';
import "../../../components/Modal.css";

export default function EditProjectModal({ showModal, setShowModal, project }) {
  const [projectName, setProjectName] = useState(project.name);
  const [projectDeadline, setProjectDeadline] = useState(project.deadline);
  const [projectDescription, setProjectDescription] = useState(project.description);

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      if (project.deadline) {
        const date = new Date(project.deadline);
        date.setDate(date.getDate() + 1);
        setProjectDeadline(date.toISOString().split("T")[0]);
      } else {
        setProjectDeadline("");
      }
      setProjectDescription(project.description);
    }
  }, [project]);

  if (!showModal) return null;

  const onSave = () => {
    const projectData = {
      name: projectName,
      deadline: projectDeadline,
      description: projectDescription,
    };
    handleEditProject(project.id, projectData, setShowModal);
  };

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h2>Edit project</h2>
        <TextField
          label="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <br />
        <TextField
          sx={{ marginTop: "10px" }}
          type="date"
          value={projectDeadline}
          onChange={(e) => setProjectDeadline(e.target.value)}
        />
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </Box>
    </Modal>
  );
}
