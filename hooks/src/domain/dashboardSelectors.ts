/**
 * dashboardSelectors.ts
 * -----------------------------------------------------------------------
 * WARSTWA: domain
 *
 * W smart-ui Home.tsx (linie ok. 74-89) w jednym ciągu kodu: filtrował
 * zadania niedokończone, dzielił je na "z deadline'em" / "bez", sortował
 * te z deadline'em, sklejał z powrotem i obcinał do 3 elementów. To reguła
 * biznesowa ("co pokazujemy jako *nadchodzące zadania* na dashboardzie"),
 * więc trafia do domain, nie do komponentu.
 */

import { TaskDto } from "./types";

/**
 * Wybiera do 3 "nadchodzących zadań" do pokazania na dashboardzie:
 * - pomija zadania już ukończone,
 * - zadania z deadline'em pokazuje jako pierwsze, posortowane od najbliższego,
 * - dopełnia zadaniami bez deadline'u, jeśli jest miejsce w limicie.
 */
export function selectUpcomingTasks(tasks: TaskDto[], limit = 3): TaskDto[] {
  const notDone = tasks.filter((task) => task.status !== "Done");

  const withDeadline = notDone.filter((task) => task.deadline);
  const withoutDeadline = notDone.filter((task) => !task.deadline);

  withDeadline.sort(
    (a, b) => new Date(a.deadline as string).getTime() - new Date(b.deadline as string).getTime()
  );

  return [...withDeadline, ...withoutDeadline].slice(0, limit);
}
