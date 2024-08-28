import { Modal, Box, Button } from "@mui/material";
import "../../../components/Modal.css";
import { deleteTask } from "../../../../models/TaskModel";

export default function DeleteTaskModal({
  showModal,
  setShowModal,
  task,
  fetchTasks,
}) {
  if (!showModal) return null;

  const handleDelete = async () => {
    const success = await deleteTask(task.project_id, task.id);
    if (success) {
      fetchTasks();
    }
    setShowModal(false);
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
          Are you sure you want to delete this task?
        </p>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={() => setShowModal(false)}>No</Button>
      </Box>
    </Modal>
  );
}
