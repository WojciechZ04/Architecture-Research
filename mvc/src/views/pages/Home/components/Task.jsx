// src/components/Task.jsx

import React from "react";
import {
  calculateDaysLeft,
  formatDaysLeft,
  getClassName,
} from "../../../../controllers/HomeController";
import "./Task.css";

export default function Task({ task }) {
  const daysLeft = task.deadline ? calculateDaysLeft(task.deadline) : null;
  const formattedDaysLeft = daysLeft !== null ? formatDaysLeft(daysLeft) : "-";
  const className = daysLeft !== null ? getClassName(daysLeft) : "";

  return (
    <div className="home-task">
      <h3>{task.name}</h3>
      {task.deadline ? (
        <>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className={className}>{formattedDaysLeft}</p>
        </>
      ) : (
        <p>No deadline</p>
      )}
    </div>
  );
}
