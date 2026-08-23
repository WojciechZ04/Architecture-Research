import { useEffect, useState, useCallback } from "react";
import TaskColumn from "./components/TaskColumn";
import "./Tasks.css";

interface TaskData {
  id: string;
  name: string;
  project_id: string;
  project_name?: string;
  deadline?: string;
  description?: string;
  status: "Not started" | "In progress" | "Done";
}


export default function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data: TaskData[] = await response.json();
      setTasks(data);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Wystąpił błąd podczas pobierania zadań.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const notStartedTasks = tasks.filter((task) => task.status === "Not started");
  const inProgressTasks = tasks.filter((task) => task.status === "In progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

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
          <TaskColumn
            value="Not started"
            tasks={notStartedTasks}
            fetchTasks={fetchTasks}
          />
          <TaskColumn
            value="In progress"
            tasks={inProgressTasks}
            fetchTasks={fetchTasks}
          />
          <TaskColumn 
            value="Done" 
            tasks={doneTasks} 
            fetchTasks={fetchTasks} 
          />
        </div>
      )}
    </div>
  );
}