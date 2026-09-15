/**
 * CreateProjectModal.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Cały stan formularza, walidacja i wywołanie API przeniesione do
 * useCreateProject(). Komponent tylko renderuje pola i podpina je pod
 * wartości/handlery zwrócone przez hook.
 */
import { useCreateProject } from "../../../hooks/useCreateProject";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
import "../../../components/Modal.css";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateProjectModal({ open, onClose, onCreated }: CreateProjectModalProps) {
  const {
    name,
    setName,
    deadline,
    setDeadline,
    hasDeadline,
    setHasDeadline,
    description,
    setDescription,
    error,
    handleClose,
    handleSubmit,
  } = useCreateProject({ onCreated, onClose });

  if (!open) return null;

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-name" aria-describedby="modal-modal-description">
      <Box className="modal">
        <h2>Create project</h2>
        <TextField label="Project name" value={name} onChange={(e) => setName(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <br />
        <label className="custom-checkbox">
          <Checkbox
            checked={hasDeadline}
            onChange={(e) => setHasDeadline(e.target.checked)}
            sx={{
              color: "var(--neutral-color)",
              "&.Mui-checked": { color: "var(--neutral-color)" },
            }}
          />
          <span>Set a finish date</span>
        </label>
        {hasDeadline && (
          <TextField sx={{ marginTop: "10px" }} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        )}
        <br />
        <TextField
          multiline
          minRows={4}
          maxRows={6}
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </Box>
    </Modal>
  );
}
