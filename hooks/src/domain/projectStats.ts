/**
 * projectStats.ts
 * -----------------------------------------------------------------------
 * WARSTWA: domain
 *
 * To jest logika biznesowa, która w smart-ui była ZDUPLIKOWANA w dwóch
 * miejscach z drobnymi różnicami:
 *   - Projects.tsx (linie ok. 55-73): liczyła % i status na podstawie
 *     project.tasks (zadania zagnieżdżone w projekcie),
 *   - Home.tsx (linie ok. 91-103): liczyła (tylko) % na podstawie
 *     osobnej tablicy tasks przefiltrowanej po project_id - bez liczenia
 *     statusu wcale, bo Home go nie potrzebował.
 *
 * Fakt, że dwa miejsca w kodzie liczyły "to samo" na dwa różne sposoby to
 * klasyczny sygnał, że logika powinna być w jednym miejscu (DRY) - to
 * jeden z argumentów, których możesz użyć w pracy przy uzasadnianiu
 * wydzielenia warstwy domain.
 *
 * Funkcje poniżej są CZYSTE (pure functions): biorą dane wejściowe, zwracają
 * wynik, nie mają efektów ubocznych, nie importują Reacta ani fetch.
 * Dzięki temu można je testować jednostkowo bez renderowania jakiegokolwiek
 * komponentu i bez mockowania sieci - to jest właśnie "testowalność",
 * którą Twoja praca ma porównywać.
 */

import { TaskDto, ProjectStatus } from "./types";

/**
 * Liczy procent ukończenia na podstawie listy zadań.
 * Zaokrąglenie w górę (Math.ceil) - identyczne zachowanie jak w oryginale
 * z smart-ui, celowo zachowane, żeby nie zmieniać logiki biznesowej,
 * a jedynie jej umiejscowienie w kodzie.
 */
export function calculateCompletionPercentage(tasks: TaskDto[]): number {
  const totalTasks = tasks.length;
  if (totalTasks === 0) return 0;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const percentage = (completedTasks / totalTasks) * 100;
  return Math.ceil(percentage);
}

/**
 * Wyznacza status projektu na podstawie statusów jego zadań:
 * - "completed"  - wszystkie zadania są "Done" (i jest przynajmniej jedno zadanie)
 * - "active"     - jest przynajmniej jedno zadanie "In progress" lub "Done",
 *                  ale nie wszystkie są "Done"
 * - "inactive"   - żadne zadanie się nie zaczęło (albo projekt nie ma zadań)
 *
 * Logika 1:1 przeniesiona z Projects.tsx (smart-ui), tylko wydzielona do
 * osobnej, nazwanej funkcji zamiast anonimowego bloku w środku komponentu.
 */
export function determineProjectStatus(tasks: TaskDto[]): ProjectStatus {
  const totalTasks = tasks.length;
  if (totalTasks === 0) return "inactive";

  const allDone = tasks.every((task) => task.status === "Done");
  if (allDone) return "completed";

  const anyStarted = tasks.some(
    (task) => task.status === "In progress" || task.status === "Done"
  );
  if (anyStarted) return "active";

  return "inactive";
}
