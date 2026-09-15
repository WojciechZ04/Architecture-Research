/**
 * useProjectOptions.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks
 *
 * Przeniesiona logika z CreateTaskModal.tsx (smart-ui, useEffect na
 * dole pliku) - modal tworzenia zadania musi wiedzieć, jakie projekty
 * pokazać w dropdownie "Select Project". To osobny, mały hook (a nie
 * część useCreateTask), bo odpowiada za inną odpowiedzialność: pobranie
 * listy opcji, nie tworzenie zadania.
 */

import { useEffect, useState } from "react";
import { projectsApi } from "../api/projectsApi";

export interface ProjectOption {
  id: string;
  name: string;
}

export function useProjectOptions() {
  const [projectOptions, setProjectOptions] = useState<ProjectOption[]>([]);

  useEffect(() => {
    let isMounted = true;

    projectsApi
      .getAll()
      .then((projects) => {
        if (isMounted) setProjectOptions(projects.map(({ id, name }) => ({ id, name })));
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projectOptions };
}
