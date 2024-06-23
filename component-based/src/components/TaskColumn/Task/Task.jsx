import "./Task.css";
import React, { useState } from "react";
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

export default function Task({ task, fetchTasks }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setShowModal(false);
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${task.projectId}/${task.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      fetchTasks();
      // Handle success (e.g., update UI or notify the user)
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  const confirmDelete = () => {
    setShowModal(true); // Show the modal when delete is clicked
  };

  return (
    <div className="task">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="task__title">{task.title}</h2>
        <button onClick={confirmDelete}>Delete</button>
      </div>
      <p className="task__description">{task.description}</p>
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
    </div>
  );
}
