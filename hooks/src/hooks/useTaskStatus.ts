/**
 * useTaskStatus.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika `updateTaskStatus` z Task.tsx (smart-ui) - obsługuje
 * checkbox ("oznacz jako Done") oraz strzałki zmieniające status zadania.
 */

import { useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { ApiError } from "../api/httpClient";
import { TaskStatus } from "../domain/types";

interface UseTaskStatusOptions {
  onStatusChanged: () => void;
}

export function useTaskStatus({ onStatusChanged }: UseTaskStatusOptions) {
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (taskId: string, status: TaskStatus) => {
    try {
      await tasksApi.updateStatus(taskId, status);
      onStatusChanged();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Error updating task status";
      setError(message);
      console.error(message);
    }
  };

  return { updateStatus, error };
}
