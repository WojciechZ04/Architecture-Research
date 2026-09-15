/**
 * Home/components/Task.tsx (wariant: hooks) - karta zadania na dashboardzie
 * -----------------------------------------------------------------------
 * calculateDaysLeft / formatDaysLeft / getClassName przeniesione do
 * domain/deadline.ts (czyste funkcje) - komponent tylko je woła i renderuje
 * wynik, nie definiuje już żadnej logiki samodzielnie.
 */
import "./Task.css";
import { calculateDaysLeft, formatDaysLeft, getDaysLeftClassName } from "../../../domain/deadline";
import { TaskDto } from "../../../domain/types";

interface DashboardTaskProps {
  task: Pick<TaskDto, "id" | "name" | "deadline">;
}

export default function Task({ task }: DashboardTaskProps) {
  return (
    <div className="home-task">
      <h3>{task.name}</h3>{" "}
      {task.deadline ? (
        <>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className={getDaysLeftClassName(calculateDaysLeft(task.deadline))}>
            {formatDaysLeft(calculateDaysLeft(task.deadline))}
          </p>
        </>
      ) : (
        "-"
      )}
    </div>
  );
}
