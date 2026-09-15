/**
 * TaskColumn.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Bez zmian logicznych względem smart-ui - ten komponent nigdy nie
 * zawierał fetch/logiki biznesowej, tylko lokalny stan widoczności modala
 * (czysty stan UI), więc zostaje tak jak był. Zmieniła się tylko nazwa
 * propa `fetchTasks` -> `onChanged`, żeby było spójnie z resztą wariantu.
 */
import { useState } from "react";
import "./TaskColumn.css";
import Task from "./Task";
import CreateTaskModal from "./CreateTaskModal";
import { TaskDto, TaskStatus } from "../../../domain/types";

interface TaskColumnProps {
  value: TaskStatus;
  tasks: TaskDto[];
  onChanged: () => void;
}

export default function TaskColumn({ value, tasks, onChanged }: TaskColumnProps) {
  const [open, setOpen] = useState<boolean>(false);

  const className =
    value === "Not started"
      ? "column to-do-column"
      : value === "In progress"
      ? "column in-progress-column"
      : value === "Done"
      ? "column done-column"
      : "column default-column";

  return (
    <div className={className}>
      <h2 className="label">{value}</h2>
      <hr />

      {tasks.map((task) => (
        <Task key={task.id} task={task} onChanged={onChanged} />
      ))}

      <div className="create-task-section" onClick={() => setOpen(true)}>
        <p>Add a Task</p>
        <i className="material-icons">add</i>
      </div>

      <CreateTaskModal open={open} onClose={() => setOpen(false)} taskStatus={value} onCreated={onChanged} />
    </div>
  );
}
