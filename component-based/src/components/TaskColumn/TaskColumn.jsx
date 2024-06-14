import "./TaskColumn.css";
import Task from "./Task/Task";

export default function TaskColumn(props) {
  const className =
    props.value === "To do"
      ? "to-do-column"
      : props.value === "In progress"
      ? "in-progress-column"
      : props.value === "Done"
      ? "done-column"
      : "default-column";

  return (
    <div className={className}>
      {props.value}
      {props.tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
