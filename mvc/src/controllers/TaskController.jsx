import { useState, useEffect } from "react";
import { fetchTasks, createTask } from "../models/TaskModel";
import { fetchProjectsFromAPI } from "../models/ProjectModel"; 

export const useCreateTaskController = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [hasDeadline, setHasDeadline] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      const projectsData = await fetchProjectsFromAPI();
      setProjects(projectsData);
    };

    loadProjects();
  }, []);

  const handleCreateTask = async (taskStatus, fetchTasks) => {
    if (!taskName.trim()) {
      setError("Task name cannot be empty");
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      projectId: projectId,
      status: taskStatus,
      deadline: hasDeadline ? taskDeadline : null,
    };

    const success = await createTask(taskData);
    if (success) {
      setTaskName("");
      setTaskDescription("");
      setProjectId("");
      setTaskDeadline("");
      setError("");
      fetchTasks();
      return true;
    }

    return false;
  };

  return {
    taskName,
    setTaskName,
    taskDescription,
    setTaskDescription,
    projectId,
    setProjectId,
    taskDeadline,
    setTaskDeadline,
    hasDeadline,
    setHasDeadline,
    projects,
    error,
    handleCreateTask,
  };
};


export const useTasksController = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    };
    loadTasks();
  }, []);

  const notStartedTasks = tasks.filter((task) => task.status === "Not started");
  const inProgressTasks = tasks.filter((task) => task.status === "In progress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return {
    notStartedTasks,
    inProgressTasks,
    doneTasks,
    reloadTasks: async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    },
  };
};