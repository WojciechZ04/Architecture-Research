import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { handleDeleteProject } from '../../../../controllers/ProjectController';
import "../../../components/Modal.css";

export default function DeleteProjectModal({ showModal, setShowModal, project }) {
  if (!showModal) return null;

  const onDelete = () => {
    handleDeleteProject(project.id, setShowModal);
  };

  return (
    <Modal
      open={showModal}
      onClose={() => setShowModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <h2 id="modal-modal-title">Confirm Delete</h2>
        <p id="modal-modal-description">
          Are you sure you want to delete this project?
        </p>
        <Button onClick={onDelete}>Yes</Button>
        <Button onClick={() => setShowModal(false)}>No</Button>
      </Box>
    </Modal>
  );
}
