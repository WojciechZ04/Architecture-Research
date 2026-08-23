import "./Project.css";
import BorderLinearProgress from "../../../components/BorderLinearProgress";

interface DashboardProjectData {
  name: string;
  deadline?: string | null;
}

interface DashboardProjectProps {
  project: DashboardProjectData;
  completionPercentage: number;
}

export default function Project({ project, completionPercentage }: DashboardProjectProps) {
  const roundedCompletionPercentage = Math.ceil(completionPercentage);

  return (
    <div className="home-project">
      <h3>{project.name}</h3>
      <p className="deadline">
        {" "}
        {project.deadline ? new Date(project.deadline).toLocaleDateString() : "-"}
      </p>
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