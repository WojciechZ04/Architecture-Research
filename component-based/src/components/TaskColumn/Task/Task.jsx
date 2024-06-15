export default function Task({ task }) {
  return (
	<div className="task">
	  <h2 className="task__title">{task.title}</h2>
	  <p className="task__description">{task.description}</p>
	</div>
  );
}