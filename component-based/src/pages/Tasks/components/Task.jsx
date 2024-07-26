import "./Task.css";
import React, { useState } from "react";
import DeleteTaskModal from "./DeleteTaskModal";
import EditTaskModal from "./EditTaskModal";

export default function Task({ task, fetchTasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const confirmDelete = () => {
    setShowDeleteModal(true);
    setShowEditModal(false);
  };

  const confirmEdit = () => {
    setShowEditModal(true);
    setShowDeleteModal(false);
  }

  return (
    <div className="task">
      <div>
        <p className="project-assigned"> {">"}{task.project_name}</p>
        <h2 className="task__title">{task.name}</h2>
        <p className="task__description">{task.description}</p>
        <p className="task__deadline">Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No deadline"}</p>
      </div>

      <button onClick={confirmDelete}>X</button>
      <button onClick={confirmEdit}>Edit</button>

      <DeleteTaskModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} task={task} fetchTasks={fetchTasks} />
      <EditTaskModal showModal={showEditModal} setShowModal={setShowEditModal} task={task} fetchTasks={fetchTasks} />
    </div>
  );
}
