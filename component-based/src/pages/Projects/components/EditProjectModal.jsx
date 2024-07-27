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

export default function EditProjectModal({ showModal, setShowModal, project }) {
  const [projectName, setProjectName] = useState(project.name);

  if (!showModal) return null;
  const handleEditProject = async () => {
    const response = await fetch(`http://localhost:5000/api/projects/${project.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
      }),
    });

    if (response.ok) {
      setProjectName("");
	  setShowModal(false);
      window.location.reload();
    } else {
      console.error("Failed to update project");
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-name"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Create project</h2>
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
        <Button onClick={handleEditProject}>Save</Button>
      </Box>
    </Modal>
  );
}
