/**
 * useHomeDashboard.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona zawartość Home.tsx (smart-ui, fetchDashboardData +
 * powiązany stan). Wyliczenia (wybór "nadchodzących zadań", completion %)
 * przeniesione do warstwy domain (dashboardSelectors.ts, projectStats.ts) -
 * ten hook tylko orkiestruje: woła API, woła funkcje domenowe, trzyma
 * wynik w stanie Reacta.
 */

import { useCallback, useEffect, useState } from "react";
import { homeApi } from "../api/homeApi";
import { ApiError } from "../api/httpClient";
import { calculateCompletionPercentage } from "../domain/projectStats";
import { selectUpcomingTasks } from "../domain/dashboardSelectors";
import { EnrichedProject, ProjectSummaryDto, TaskDto, UserProfileDto } from "../domain/types";

export function useHomeDashboard() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [projects, setProjects] = useState<(ProjectSummaryDto & Pick<EnrichedProject, "completionPercentage">)[]>([]);
  const [user, setUser] = useState<UserProfileDto>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await homeApi.getDashboardData();

      setUser(data.users[0] || {});
      setTasks(selectUpcomingTasks(data.tasks, 3));

      const projectsWithCompletion = data.projects.map((project) => {
        const projectTasks = data.tasks.filter((task) => task.project_id === project.id);
        return {
          ...project,
          completionPercentage: calculateCompletionPercentage(projectTasks),
        };
      });
      setProjects(projectsWithCompletion);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Wystąpił błąd podczas ładowania danych.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { user, tasks, projects, isLoading, error };
}
