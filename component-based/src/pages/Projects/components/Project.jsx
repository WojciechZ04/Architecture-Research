import React, { useState } from "react";
import "./Project.css";

export default function Project({ project }) {
  // State to manage the visibility of the selection panel
  const [showPanel, setShowPanel] = useState(false);

  // Event handler to toggle the selection panel
  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div className="project">
      <div className="project-content">
        <p className="project__title">{project.name}</p>
        <p>15 May 2024</p>
        <p>Milestone 2</p>
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
    </div>
  );
}
