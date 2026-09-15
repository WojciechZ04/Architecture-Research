/**
 * tasksApi.ts
 * -----------------------------------------------------------------------
 * WARSTWA: api
 *
 * Odpowiednik fetch()-y z Tasks.tsx, CreateTaskModal.tsx,
 * DeleteTaskModal.tsx i Task.tsx (checkbox zmieniający status) w wariancie
 * smart-ui. Każda funkcja odpowiada jednemu endpointowi z
 * server/routes/tasks.js.
 */

import { apiFetch } from "./httpClient";
import { CreateTaskPayload, TaskDto, TaskStatus } from "../domain/types";

export const tasksApi = {
  /** GET /api/tasks - płaska lista wszystkich zadań użytkownika (ze wszystkich projektów) */
  getAll(): Promise<TaskDto[]> {
    return apiFetch<TaskDto[]>("/tasks");
  },

  /** POST /api/tasks */
  create(payload: CreateTaskPayload): Promise<unknown> {
    return apiFetch("/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** PUT /api/tasks/:taskId - jedyne pole, jakie backend obsługuje przy tym endpointzie, to `status` */
  updateStatus(taskId: string, status: TaskStatus): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  },

  /** DELETE /api/tasks/:projectId/:taskId */
  remove(projectId: string, taskId: string): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/tasks/${projectId}/${taskId}`, {
      method: "DELETE",
    });
  },
};
