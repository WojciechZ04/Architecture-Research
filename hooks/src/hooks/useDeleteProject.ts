/**
 * useDeleteProject.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z DeleteProjectModal.tsx (smart-ui). Tak jak przy
 * useEditProject.ts - oryginał robił `window.location.reload()`, tutaj
 * ujednolicono do `onDeleted` (czyli `refetch`), zgodnie z resztą CRUD-a.
 */

import { useState } from "react";
import { projectsApi } from "../api/projectsApi";
import { ApiError } from "../api/httpClient";

interface UseDeleteProjectOptions {
  projectId: string;
  onDeleted: () => void;
  onClose: () => void;
}

export function useDeleteProject({ projectId, onDeleted, onClose }: UseDeleteProjectOptions) {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await projectsApi.remove(projectId);
      onDeleted();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to delete project";
      setError(message);
    } finally {
      onClose();
    }
  };

  return { error, handleDelete };
}
