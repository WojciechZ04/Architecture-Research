import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Project.css";

export default function Project({ project }) {
  const [showPanel, setShowPanel] = useState(false);

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
          <p>15 May 2024</p>
          <p>Milestone 2</p>
        </div>
      </Link>
      <div className="project-action">
        <span onClick={togglePanel}>
          <i className="material-icons">more_vert</i>
        </span>
        {showPanel && (
          <div className="selection-panel">
            <button onClick={() => console.log("Edit")}>Edit</button>
            <button onClick={() => console.log("Delete")}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
