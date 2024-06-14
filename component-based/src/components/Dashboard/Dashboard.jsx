import "./Dashboard.css";
import Task from "../Task/Task";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';


//progress bar (to edit)
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <button>Project 1</button>
        <button>Project 2</button>
      </div>
      <BorderLinearProgress variant="determinate" value={40} /> 
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
              <Task></Task>
              <Task></Task>
              <Task></Task>
          </tbody>
        </table>
      </div>
    </div>
  );
}
