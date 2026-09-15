import { Button, Box, Modal } from "@mui/material";
import "../../../components/Modal.css";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ isOpen, onClose, onDelete }: DeleteModalProps) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h2 id="modal-modal-title">Confirm Delete</h2>
        <p id="modal-modal-description">
          Are you sure you want to delete your account?
        </p>
        <Button onClick={handleDelete} className="yes-button">Yes</Button>
        <Button onClick={onClose} className="no-button">No</Button>
      </Box>
    </Modal>
  );
}