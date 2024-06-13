import "./Dashboard.css";
import Task from "../Task/Task";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <button>Project 1</button>
		<button>Project 2</button>
      </div>
      <p>There will be progress bar</p>
	  <div>
		<Task></Task>
	  </div>
    </div>
  );
}
