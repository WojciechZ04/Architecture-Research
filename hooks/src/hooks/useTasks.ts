/**
 * useTasks.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona zawartość Tasks.tsx (smart-ui): fetch + podział na trzy
 * kolumny statusu. Podział na kolumny wykonuje teraz czysta funkcja
 * z domain/taskGrouping.ts, a nie trzy osobne `.filter()` w komponencie.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { tasksApi } from "../api/tasksApi";
import { ApiError } from "../api/httpClient";
import { groupTasksByStatus } from "../domain/taskGrouping";
import { TaskDto } from "../domain/types";

export function useTasks() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await tasksApi.getAll();
      setTasks(data);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Wystąpił błąd podczas pobierania zadań.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const groupedTasks = useMemo(() => groupTasksByStatus(tasks), [tasks]);

  return {
    isLoading,
    error,
    notStartedTasks: groupedTasks.notStarted,
    inProgressTasks: groupedTasks.inProgress,
    doneTasks: groupedTasks.done,
    refetch: fetchTasks,
  };
}
