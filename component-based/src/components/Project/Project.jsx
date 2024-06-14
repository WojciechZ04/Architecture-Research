import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import "./Project.css";


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

export default function Project() {
  return (
	<div className="project">
	  <h2 className="project__title">Project1</h2>
	  <BorderLinearProgress variant="determinate" value={40} /> 
	  <p className="project__description">Lorem ipsum</p>
	  <button>Details</button>
	  <button>Tasks</button>
	  <button>Teams</button>
	</div>
  );
}