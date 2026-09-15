/**
 * deadline.ts
 * -----------------------------------------------------------------------
 * WARSTWA: domain
 *
 * Logika 1:1 przeniesiona z pages/Home/components/Task.tsx (smart-ui),
 * gdzie trzy funkcje (calculateDaysLeft, formatDaysLeft, getClassName)
 * były zdefiniowane WEWNĄTRZ komponentu prezentacyjnego. To była logika
 * biznesowa (reguła "co znaczy przeterminowane zadanie") ukryta w
 * komponencie, którego jedynym zadaniem powinno być renderowanie.
 *
 * Tutaj funkcje są czyste i niezależne od Reacta - komponent Home/Task.tsx
 * będzie je po prostu wywoływał, zamiast definiować od nowa.
 */

/** Liczba dni pozostałych do deadline'u (ujemna = po terminie) */
export function calculateDaysLeft(deadline: string): number {
  const currentDate = new Date();
  const deadlineDate = new Date(deadline);
  const timeDifference = deadlineDate.getTime() - currentDate.getTime();
  return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

/** Tekst do wyświetlenia na podstawie liczby dni do deadline'u */
export function formatDaysLeft(daysLeft: number): string {
  if (daysLeft === 0) return "Task due today";
  if (daysLeft > 0) return `Days left: ${daysLeft}`;
  if (daysLeft === -1) return "Overdue by: 1 day!";
  return `Overdue by: ${Math.abs(daysLeft)} days!`;
}

/** Klasa CSS do podkolorowania etykiety w zależności od "pilności" zadania */
export function getDaysLeftClassName(daysLeft: number): string {
  if (daysLeft > 3) return "days-left-orange";
  if (daysLeft >= 0) return "days-left-red";
  return "days-left-dark-red";
}
