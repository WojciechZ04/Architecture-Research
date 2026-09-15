/**
 * taskGrouping.ts
 * -----------------------------------------------------------------------
 * WARSTWA: domain
 *
 * W smart-ui Tasks.tsx robił trzy osobne `tasks.filter(...)` wprost w ciele
 * komponentu (linie ok. 54-56), żeby rozdzielić zadania na trzy kolumny
 * kanbana. To prosta logika, ale nadal jest to REGUŁA BIZNESOWA
 * ("jak dzielimy zadania na kolumny"), nie kwestia wyglądu - więc trzyma
 * się tej samej zasady co reszta warstwy domain: żadnych importów z Reacta.
 */

import { TaskDto, TaskStatus } from "./types";

export interface TasksGroupedByStatus {
  notStarted: TaskDto[];
  inProgress: TaskDto[];
  done: TaskDto[];
}

const STATUS_TO_GROUP_KEY: Record<TaskStatus, keyof TasksGroupedByStatus> = {
  "Not started": "notStarted",
  "In progress": "inProgress",
  Done: "done",
};

/** Dzieli płaską listę zadań na trzy grupy odpowiadające kolumnom Kanbana */
export function groupTasksByStatus(tasks: TaskDto[]): TasksGroupedByStatus {
  const grouped: TasksGroupedByStatus = {
    notStarted: [],
    inProgress: [],
    done: [],
  };

  for (const task of tasks) {
    const key = STATUS_TO_GROUP_KEY[task.status];
    grouped[key].push(task);
  }

  return grouped;
}
