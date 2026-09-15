/**
 * useCreateTask.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z CreateTaskModal.tsx (smart-ui) - bez części
 * odpowiedzialnej za pobranie listy projektów do dropdowna, bo to
 * osobna odpowiedzialność wydzielona do useProjectOptions.ts.
 * Komponent CreateTaskModal w tym wariancie użyje OBU hooków naraz.
 */

import { useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { ApiError } from "../api/httpClient";
import { TaskStatus } from "../domain/types";

interface UseCreateTaskOptions {
  taskStatus: TaskStatus;
  onCreated: () => void;
  onClose: () => void;
}

export function useCreateTask({ taskStatus, onCreated, onClose }: UseCreateTaskOptions) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [projectId, setProjectId] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const reset = () => {
    setName("");
    setDescription("");
    setProjectId("");
    setDeadline("");
  };

  const handleClose = () => {
    onClose();
    setError("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Task name cannot be empty");
      return;
    }

    try {
      await tasksApi.create({
        name,
        description,
        projectId,
        status: taskStatus,
        deadline: hasDeadline ? deadline : null,
      });
      handleClose();
      reset();
      onCreated();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to create task";
      setError(message);
    }
  };

  return {
    name,
    setName,
    description,
    setDescription,
    projectId,
    setProjectId,
    deadline,
    setDeadline,
    hasDeadline,
    setHasDeadline,
    error,
    handleClose,
    handleSubmit,
  };
}
