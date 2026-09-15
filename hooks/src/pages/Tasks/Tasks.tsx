/**
 * Tasks.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Fetch i grupowanie zadań w kolumny przeniesione do useTasks().
 */
import TaskColumn from "./components/TaskColumn";
import { useTasks } from "../../hooks/useTasks";
import "./Tasks.css";

export default function Tasks() {
  const { isLoading, error, notStartedTasks, inProgressTasks, doneTasks, refetch } = useTasks();

  return (
    <div className="container">
      <div className="title">
        <h1>Your Tasks</h1>
      </div>
      <div className="control-panel"></div>

      {isLoading ? (
        <div className="loading-spinner">Pobieranie zadań...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="task-columns">
          <TaskColumn value="Not started" tasks={notStartedTasks} onChanged={refetch} />
          <TaskColumn value="In progress" tasks={inProgressTasks} onChanged={refetch} />
          <TaskColumn value="Done" tasks={doneTasks} onChanged={refetch} />
        </div>
      )}
    </div>
  );
}
