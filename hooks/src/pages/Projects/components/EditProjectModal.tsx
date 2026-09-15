/**
 * EditProjectModal.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Stan formularza edycji i wywołanie API przeniesione do useEditProject().
 * Patrz komentarz w useEditProject.ts odnośnie zmiany window.location.reload()
 * na onUpdated (refetch).
 */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import "../../../components/Modal.css";
import { useEditProject } from "../../../hooks/useEditProject";
import { ProjectDto } from "../../../domain/types";

interface EditProjectModalProps {
  showModal: boolean;
  onClose: () => void;
  project: ProjectDto;
  onUpdated: () => void;
}

export default function EditProjectModal({ showModal, onClose, project, onUpdated }: EditProjectModalProps) {
  const { name, setName, deadline, setDeadline, description, setDescription, error, handleSubmit } = useEditProject({
    project,
    onUpdated,
    onClose,
  });

  if (!showModal) return null;

  return (
    <Modal open={showModal} onClose={onClose} aria-labelledby="modal-modal-name" aria-describedby="modal-modal-description">
      <Box className="modal">
        <h2>Edit project</h2>
        <TextField label="Project name" value={name} onChange={(e) => setName(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <br />
        <TextField sx={{ marginTop: "10px" }} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </Box>
    </Modal>
  );
}
