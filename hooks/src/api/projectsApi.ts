/**
 * projectsApi.ts
 * -----------------------------------------------------------------------
 * WARSTWA: api
 *
 * Odpowiednik "wszystkich fetch('http://localhost:5000/api/projects...')"
 * rozrzuconych po Projects.tsx, CreateProjectModal.tsx, EditProjectModal.tsx,
 * DeleteProjectModal.tsx i CreateTaskModal.tsx (ten ostatni pobierał
 * projekty do dropdowna) w wariancie smart-ui.
 *
 * Każda funkcja tutaj odpowiada dokładnie jednemu endpointowi z
 * server/routes/projects.js - to jest "translacja" REST API na wygodne
 * funkcje TypeScript, bez żadnej logiki biznesowej.
 */

import { apiFetch } from "./httpClient";
import { CreateProjectPayload, ProjectDto, UpdateProjectPayload } from "../domain/types";

export const projectsApi = {
  /** GET /api/projects - lista projektów użytkownika wraz z zagnieżdżonymi zadaniami */
  getAll(): Promise<ProjectDto[]> {
    return apiFetch<ProjectDto[]>("/projects");
  },

  /** POST /api/projects - backend NIE zwraca pola `tasks` przy tworzeniu (świeży projekt i tak ich nie ma) */
  create(payload: CreateProjectPayload): Promise<Omit<ProjectDto, "tasks">> {
    return apiFetch<Omit<ProjectDto, "tasks">>("/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** PUT /api/projects/:id - backend zwraca tylko {message}, nie zaktualizowany obiekt */
  update(id: string, payload: UpdateProjectPayload): Promise<{ message: string }> {
    return apiFetch<{ message: string }>(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /** DELETE /api/projects/:id - backend zwraca 204 bez body */
  remove(id: string): Promise<void> {
    return apiFetch<void>(`/projects/${id}`, { method: "DELETE" });
  },
};
