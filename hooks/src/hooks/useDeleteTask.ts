/**
 * useDeleteTask.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z DeleteTaskModal.tsx (smart-ui).
 */

import { useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { ApiError } from "../api/httpClient";

interface UseDeleteTaskOptions {
  projectId: string;
  taskId: string;
  onDeleted: () => void;
  onClose: () => void;
}

export function useDeleteTask({ projectId, taskId, onDeleted, onClose }: UseDeleteTaskOptions) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await tasksApi.remove(projectId, taskId);
      onDeleted();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to delete task";
      setError(message);
      console.error(message);
    } finally {
      onClose();
    }
  };

  return { error, handleDelete };
}
