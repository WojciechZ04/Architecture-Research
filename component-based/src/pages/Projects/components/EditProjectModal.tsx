import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import "../../../components/Modal.css";

interface ProjectData {
  id: string;
  name: string;
  deadline?: string;
  description?: string;
}

interface EditProjectModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  project: ProjectData;
}

 export default function EditProjectModal({ showModal, setShowModal, project }: EditProjectModalProps) {
  const [projectName, setProjectName] = useState<string>(project?.name || "");
  const [projectDeadline, setProjectDeadline] = useState<string>(project?.deadline || "");
  const [projectDescription, setProjectDescription] = useState<string>(project?.description || "");

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
      setProjectDescription(project.description || "");
    }
  }, [project]);

  if (!showModal) return null;

  const handleEditProject = async () => {
    const response = await fetch(
      `http://localhost:5000/api/projects/${project.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: projectName,
          deadline: projectDeadline,
          description: projectDescription,
        }),
      }
    );

    if (response.ok) {
      setProjectName("");
      setProjectDeadline("");
      setProjectDescription("");
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
        <Button onClick={handleEditProject}>Save</Button>
      </Box>
    </Modal>
  );
}