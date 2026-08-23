import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import "../../../components/Modal.css";

interface CreateProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  fetchProjects: () => void;
}

export default function CreateProjectModal({
  open,
  setOpen,
  fetchProjects,
}: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDeadline, setProjectDeadline] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  if (!open) return null;

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      setError("Project name is required");
      return;
    }

    const response = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        deadline: hasDeadline ? projectDeadline : null,
        description: projectDescription,
      }),
    });

    if (response.ok) {
      handleClose();
      setProjectName("");
      setProjectDeadline("");
      setProjectDescription("");
      setError("");
      fetchProjects();
    } else {
      console.error("Failed to create project");
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
        <h2>Create project</h2>
        <TextField
          label="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
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
            value={projectDeadline}
            onChange={(e) => setProjectDeadline(e.target.value)}
          />
        )}
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateProject}>Create</Button>
        </div>
      </Box>
    </Modal>
  );
}