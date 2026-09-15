/**
 * DeleteProjectModal.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Logika usuwania przeniesiona do useDeleteProject().
 */
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../../components/Modal.css";
import { useDeleteProject } from "../../../hooks/useDeleteProject";

interface DeleteProjectModalProps {
  showModal: boolean;
  onClose: () => void;
  projectId: string;
  onDeleted: () => void;
}

export default function DeleteProjectModal({ showModal, onClose, projectId, onDeleted }: DeleteProjectModalProps) {
  const { error, handleDelete } = useDeleteProject({ projectId, onDeleted, onClose });

  if (!showModal) return null;

  return (
    <Modal open={showModal} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="modal">
        <h2 id="modal-modal-title">Confirm Delete</h2>
        <p id="modal-modal-description">Are you sure you want to delete this project?</p>
        {error && <p className="error">{error}</p>}
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </Box>
    </Modal>
  );
}
