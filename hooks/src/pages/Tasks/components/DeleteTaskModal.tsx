/**
 * DeleteTaskModal.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Logika usuwania przeniesiona do useDeleteTask().
 */
import { Modal, Box, Button } from "@mui/material";
import "../../../components/Modal.css";
import { useDeleteTask } from "../../../hooks/useDeleteTask";

interface DeleteTaskModalProps {
  showModal: boolean;
  onClose: () => void;
  projectId: string;
  taskId: string;
  onDeleted: () => void;
}

export default function DeleteTaskModal({ showModal, onClose, projectId, taskId, onDeleted }: DeleteTaskModalProps) {
  const { error, handleDelete } = useDeleteTask({ projectId, taskId, onDeleted, onClose });

  if (!showModal) return null;

  return (
    <Modal open={showModal} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="modal">
        <h2 id="modal-modal-title">Confirm Delete</h2>
        <p id="modal-modal-description">Are you sure you want to delete this task?</p>
        {error && <p className="error">{error}</p>}
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </Box>
    </Modal>
  );
}
