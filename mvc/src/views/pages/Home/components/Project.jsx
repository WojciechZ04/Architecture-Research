import React from "react";
import { getFormattedDeadline, getRoundedCompletionPercentage } from "../../../../controllers/HomeController";
import BorderLinearProgress from "../../../components/BorderLinearProgress";
import "./Project.css";

export default function Project({ project, completionPercentage }) {
  const formattedDeadline = getFormattedDeadline(project.deadline);
  const roundedCompletionPercentage = getRoundedCompletionPercentage(completionPercentage);

  return (
    <div className="home-project">
      <h3>{project.name}</h3>
      <p className="deadline">{formattedDeadline}</p>
      <div className="progress-bar">
        <BorderLinearProgress
          className="border-linear-progress"
          variant="determinate"
          value={roundedCompletionPercentage}
        />
        <p>{roundedCompletionPercentage} %</p>
      </div>
    </div>
  );
}
