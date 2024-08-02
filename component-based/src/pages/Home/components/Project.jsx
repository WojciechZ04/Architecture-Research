import "./Project.css";
import BorderLinearProgress from "../../../components/BorderLinearProgress";

export default function Project({ project, completionPercentage }) {
  const roundedCompletionPercentage = Math.ceil(completionPercentage);

  return (
    <div className="home-project">
      <h3>{project.name}</h3>
      <p>{project.deadline}</p>
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