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

  // const confirmEdit = () => {
  //   setShowEditModal(true);
  //   setShowDeleteModal(false);
  // };

  return (
    <div className="task">
      <div className="checkbox">
        <label class="checkbox-btn">
          <label for="checkbox"></label>
          <input id="checkbox" type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div className="task-details">
        <div className="grid">
          <p className="project-assigned">
            {" "}
            {">"}
            {task.project_name}
          </p>
          <h2 className="task__title">{task.name}</h2>
          <p className="task__deadline">
            {" "}
            {task.deadline
              ? new Date(task.deadline).toLocaleDateString()
              : ""}
          </p>
        </div>
        <p className="task__description">{task.description}</p>
      </div>

      <div className="task-controls">
        {/* <span onClick={confirmEdit}>
          <i className="material-icons task-icon">edit</i>
        </span> */}
        <span onClick={confirmDelete}>
          <i className="material-icons task-icon">close</i>
        </span>
      </div>

      <DeleteTaskModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        task={task}
        fetchTasks={fetchTasks}
      />
      <EditTaskModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        task={task}
        fetchTasks={fetchTasks}
      />
    </div>
  );
}
