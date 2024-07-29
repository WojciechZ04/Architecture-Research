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

  
  const handleCheckboxChange = async (e) => {
    if (e.target.checked) {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Done" }),
        });

        if (response.ok) {
          fetchTasks(); // Refresh the task list
        } else {
          console.error("Failed to update task status");
        }
      } catch (error) {
        console.error("Error updating task status", error);
      }
    }
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
          <input id="checkbox" type="checkbox" onChange={handleCheckboxChange} checked={task.status === "Done"}/>
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
