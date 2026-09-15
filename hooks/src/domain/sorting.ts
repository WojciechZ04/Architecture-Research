/**
 * sorting.ts
 * -----------------------------------------------------------------------
 * WARSTWA: domain
 *
 * Funkcja sortProjects() w smart-ui (Projects.tsx, linie ok. 93-112) była
 * zdefiniowana WEWNĄTRZ komponentu, więc:
 *  - była tworzona na nowo przy każdym renderze,
 *  - nie dało się jej przetestować bez zamontowania całego komponentu Projects,
 *  - nie dało się jej użyć nigdzie indziej (np. w przyszłości na liście
 *    projektów w innym widoku).
 *
 * Tutaj to zwykła, czysta funkcja - działa na dowolnej tablicy obiektów,
 * które mają `name` i `deadline`, więc jest reużywalna.
 */

import { EnrichedProject } from "./types";

/** Obsługiwane wartości sortowania - dokładnie te, które oferuje DataControls w UI */
export type SortValue = "date-asc" | "date-desc" | "name-asc" | "name-desc";

/**
 * Sortuje listę projektów wg podanego kryterium.
 * UWAGA: tak jak oryginał, sortuje "w miejscu" (Array.sort mutuje tablicę) -
 * dlatego wywołujący (hook) przekazuje kopię tablicy, jeśli nie chce
 * zmutować stanu bezpośrednio. Zachowujemy to zachowanie 1:1 z smart-ui,
 * żeby porównanie architektur nie było zaburzone zmianą logiki.
 */
export function sortProjects(
  projects: EnrichedProject[],
  sortValue: SortValue | string
): EnrichedProject[] {
  const [criteria, direction] = sortValue.split("-");

  return projects.sort((a, b) => {
    let fieldA: string | number;
    let fieldB: string | number;

    if (criteria === "date") {
      fieldA = new Date(a.deadline).getTime();
      fieldB = new Date(b.deadline).getTime();
    } else {
      // criteria === "name"
      fieldA = a.name.toLowerCase();
      fieldB = b.name.toLowerCase();
    }

    if (direction === "asc") {
      return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
    }
    return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
  });
}

/** Filtruje projekty wg statusu wybranego w DataControls ("all" | "active" | "completed" | "inactive") */
export function filterProjectsByStatus(
  projects: EnrichedProject[],
  filterValue: string
): EnrichedProject[] {
  if (filterValue === "all") return projects;
  return projects.filter((project) => project.status === filterValue);
}

/** Filtruje projekty po fragmencie nazwy (case-insensitive) - logika z paska wyszukiwania */
export function searchProjectsByName(
  projects: EnrichedProject[],
  searchTerm: string
): EnrichedProject[] {
  const term = searchTerm.toLowerCase();
  return projects.filter((project) => project.name.toLowerCase().includes(term));
}
