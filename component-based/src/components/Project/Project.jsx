import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import "./Project.css";

//progress bar (to edit)
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function Project({ project }) {
  const completedTasks = project.tasks.filter(
    (task) => task.status === "done"
  ).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  console.log("Progress: " + progress);

  return (
    <div className="project">
      <h2 className="project__title">{project.title}</h2>
      <BorderLinearProgress variant="determinate" value={progress} />
      <button>Details</button>
      <button>Tasks</button>
      <button>Teams</button>
    </div>
  );
}
