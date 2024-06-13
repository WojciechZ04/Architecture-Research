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
