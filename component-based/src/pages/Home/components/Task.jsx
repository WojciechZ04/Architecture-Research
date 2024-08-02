import "./Task.css";

export default function Task({ task }) {
  return (
    <div className="home-task">
      <h3>{task.name}</h3>
      <p>
        {" "}
        {task.deadline ? new Date(task.deadline).toLocaleDateString() : ""}
      </p>
    </div>
  );
}
