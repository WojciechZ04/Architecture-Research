import "./Task.css";

export default function Task({ task, fetchTasks }) {
const handleDelete = async () => {
	try {
		const response = await fetch(`http://localhost:5000/api/tasks/${task.projectId}/${task.id}`, {
		  method: 'DELETE',
		});
		if (!response.ok) {
		  throw new Error('Failed to delete task');
		}
		fetchTasks();
		// Handle success (e.g., update UI or notify the user)
	  } catch (error) {
		console.error('Failed to delete task:', error);
		// Optionally, handle the error (e.g., show an error message)
	  }
	};

  return (
    <div className="task">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="task__title">{task.title}</h2>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <p className="task__description">{task.description}</p>
    </div>
  );
}
