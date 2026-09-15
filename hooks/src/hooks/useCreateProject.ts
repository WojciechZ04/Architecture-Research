/**
 * useCreateProject.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z CreateProjectModal.tsx (smart-ui): stan formularza
 * + walidacja ("nazwa nie może być pusta") + wywołanie API + reset
 * formularza po sukcesie. Komponent CreateProjectModal w tym wariancie
 * będzie tylko renderował pola formularza i podpinał je pod wartości/
 * handlery zwrócone przez ten hook.
 *
 * `onCreated` to callback wołany po udanym utworzeniu projektu - w
 * praktyce będzie to `refetch` z useProjects(), dzięki czemu lista na
 * ekranie Projects odświeży się automatycznie (dokładnie ten sam efekt,
 * co `fetchProjects()` wołane z modala w smart-ui).
 */

import { useState } from "react";
import { projectsApi } from "../api/projectsApi";
import { ApiError } from "../api/httpClient";

interface UseCreateProjectOptions {
  onCreated: () => void;
  onClose: () => void;
}

export function useCreateProject({ onCreated, onClose }: UseCreateProjectOptions) {
  const [name, setName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [hasDeadline, setHasDeadline] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const reset = () => {
    setName("");
    setDeadline("");
    setHasDeadline(false);
    setDescription("");
    setError("");
  };

  const handleClose = () => {
    onClose();
    setError("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      await projectsApi.create({
        name,
        deadline: hasDeadline ? deadline : null,
        description,
      });
      reset();
      onClose();
      onCreated();
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Failed to create project";
      setError(message);
    }
  };

  return {
    name,
    setName,
    deadline,
    setDeadline,
    hasDeadline,
    setHasDeadline,
    description,
    setDescription,
    error,
    handleClose,
    handleSubmit,
  };
}
