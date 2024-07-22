import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteTaskModal({ showModal, setShowModal, task, fetchTasks }) {
	if (!showModal) return null;

	const handleDelete = async () => {
		try {
		  const response = await fetch(
			`http://localhost:5000/api/tasks/${task.project_id}/${task.id}`,
			{
			  method: "DELETE",
			}
		  );
		  if (!response.ok) {
			throw new Error("Failed to delete task");
		  }
		  fetchTasks();
		} catch (error) {
		  console.error("Failed to delete task:", error);
		} finally {
			setShowModal(false);
		  }
	  };

	  return (
		<Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-modal-title">Confirm Delete</h2>
          <p id="modal-modal-description">Are you sure you want to delete this task?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowModal(false)}>No</button>
        </Box>
      </Modal>
	  )
}