import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";

export default function Project({ project }) {
  const [showPanel, setShowPanel] = useState(false);
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

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className="project">
      <Link
        key={project.id}
        to={`/projects/${project.id}`}
        className="project-link"
      >
        <div className="project-content">
          <p className="project__title">{project.name}</p>
          <p>{" "}
          {project.deadline ? new Date(project.deadline).toLocaleDateString() : ""}</p>
          <p>Milestone 2</p>
        </div>
      </Link>
      <div className="project-action">
        <span onClick={togglePanel}>
          <i className="material-icons">more_vert</i>
        </span>
        {showPanel && (
          <div className="selection-panel">
            <button onClick={confirmEdit}>Edit</button>
            <button onClick={confirmDelete}>Delete</button>
          </div>
        )}
      </div>

      <DeleteProjectModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} project={project} />
      <EditProjectModal showModal={showEditModal} setShowModal={setShowEditModal} project={project} />
    </div>
  );
}
