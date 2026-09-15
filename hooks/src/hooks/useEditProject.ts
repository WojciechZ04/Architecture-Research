/**
 * useEditProject.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z EditProjectModal.tsx (smart-ui).
 *
 * UWAGA - drobna, celowa poprawka względem oryginału: w smart-ui po
 * udanej edycji komponent robił `window.location.reload()` (pełne
 * przeładowanie strony), podczas gdy CreateProjectModal i
 * DeleteProjectModal odświeżały tylko listę przez ponowne wywołanie
 * fetchProjects(). To niespójność w oryginalnym kodzie (najpewniej
 * przeoczenie), a nie świadoma decyzja architektoniczna - tutaj
 * ujednolicono to do tego samego mechanizmu `onUpdated` (czyli `refetch`
 * z useProjects()) co reszta operacji CRUD. Warto to odnotować w pracy
 * jako drobną korektę wprowadzoną przy okazji refaktoryzacji, a nie jako
 * różnicę wynikającą z samej architektury.
 */

import { useEffect, useState } from "react";
import { projectsApi } from "../api/projectsApi";
import { ApiError } from "../api/httpClient";
import { ProjectDto } from "../domain/types";

interface UseEditProjectOptions {
  project: Pick<ProjectDto, "id" | "name" | "deadline" | "description">;
  onUpdated: () => void;
  onClose: () => void;
}

export function useEditProject({ project, onUpdated, onClose }: UseEditProjectOptions) {
  const [name, setName] = useState<string>(project?.name || "");
  const [deadline, setDeadline] = useState<string>(project?.deadline || "");
  const [description, setDescription] = useState<string>(project?.description || "");
  const [error, setError] = useState<string>("");

  // Synchronizacja formularza z projektem, gdy modal zostaje otwarty dla innego projektu
  // (identyczne zachowanie jak useEffect w oryginalnym EditProjectModal.tsx).
  useEffect(() => {
    if (!project) return;

    setName(project.name);
    if (project.deadline) {
      const date = new Date(project.deadline);
      date.setDate(date.getDate() + 1);
      setDeadline(date.toISOString().split("T")[0]);
    } else {
      setDeadline("");
    }
    setDescription(project.description || "");
  }, [project]);

  const handleSubmit = async () => {
    try {
      await projectsApi.update(project.id, { name, deadline, description });
      setName("");
      setDeadline("");
      setDescription("");
      onClose();
      onUpdated();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to update project";
      setError(message);
    }
  };

  return { name, setName, deadline, setDeadline, description, setDescription, error, handleSubmit };
}
