/**
 * useProjects.ts
 * -----------------------------------------------------------------------
 * WARSTWA: hooks (custom hook)
 *
 * To jest "przeniesiona" zawartość komponentu Projects.tsx ze smart-ui
 * (cały stan + fetchProjects + sortProjects + filtrowanie + wyszukiwanie,
 * linie ok. 24-134 oryginału). Różnica: komponent Projects.tsx w tym
 * wariancie będzie WOŁAŁ ten hook i tylko renderował JSX - żadnej logiki
 * biznesowej ani fetch nie będzie już w pliku komponentu.
 *
 * Ten hook JEST związany z Reactem (używa useState/useEffect/useCallback/
 * useMemo) - i to jest właśnie sedno wariantu "hooks": separacja logiki od
 * JSX, ale nadal "na poziomie frameworka". Ten sam kod nie zadziała np. w
 * Node/CLI, bo wymaga środowiska Reacta (hooki muszą być wołane wewnątrz
 * komponentu/innego hooka).
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { projectsApi } from "../api/projectsApi";
import { ApiError } from "../api/httpClient";
import { calculateCompletionPercentage, determineProjectStatus } from "../domain/projectStats";
import { filterProjectsByStatus, searchProjectsByName, sortProjects, SortValue } from "../domain/sorting";
import { EnrichedProject } from "../domain/types";

export function useProjects() {
  const [projects, setProjects] = useState<EnrichedProject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortValue, setSortValue] = useState<SortValue>("date-asc");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Pobiera projekty z API i "wzbogaca" je o wyliczenia z warstwy domain
   * (completionPercentage, status). fetchProjects jest też wywoływane przez
   * modale (create) po udanej operacji, żeby odświeżyć listę - dokładnie
   * tak samo jak w smart-ui, tylko teraz ta funkcja mieszka w hooku,
   * a nie w komponencie.
   */
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await projectsApi.getAll();

      const enriched: EnrichedProject[] = data.map((project) => ({
        ...project,
        completionPercentage: calculateCompletionPercentage(project.tasks),
        status: determineProjectStatus(project.tasks),
      }));

      setProjects(sortProjects(enriched, sortValue));
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Nie udało się pobrać projektów";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [sortValue]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const onSortChange = useCallback((value: string) => {
    setSortValue(value as SortValue);
    setProjects((current) => sortProjects([...current], value as SortValue));
  }, []);

  const onFilterChange = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  /**
   * Filtrowanie + wyszukiwanie liczymy w useMemo zamiast bezpośrednio w JSX
   * (jak w smart-ui) - efekt końcowy jest identyczny, ale ta wersja
   * przelicza się tylko wtedy, gdy realnie zmienią się zależności, a nie
   * przy każdym renderze komponentu.
   */
  const visibleProjects = useMemo(() => {
    const filtered = filterProjectsByStatus(projects, filterValue);
    return searchProjectsByName(filtered, searchTerm);
  }, [projects, filterValue, searchTerm]);

  return {
    projects: visibleProjects,
    isLoading,
    error,
    searchTerm,
    sortValue,
    filterValue,
    onSearchChange,
    onSortChange,
    onFilterChange,
    refetch: fetchProjects,
  };
}
