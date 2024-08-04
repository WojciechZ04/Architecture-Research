import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../../../components/Modal.css";

export default function EditTaskModal({
  showModal,
  setShowModal,
  task,
  fetchTasks,
}) {
  if (!showModal) return null;
  return (
    <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <p>Edit modal works.</p>
          <button onClick={() => setShowModal(false)}>X</button>
        </Box>
      </Modal>
  );
}
