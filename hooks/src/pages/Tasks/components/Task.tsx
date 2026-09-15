/**
 * Task.tsx (wariant: hooks) - pojedyncza karta zadania w kolumnie
 * -----------------------------------------------------------------------
 * updateTaskStatus przeniesione do useTaskStatus(). `showDeleteModal` to
 * czysty stan UI - zostaje lokalnie w komponencie.
 */
import "./Task.css";
import { useState } from "react";
import DeleteTaskModal from "./DeleteTaskModal";
import { useTaskStatus } from "../../../hooks/useTaskStatus";
import { TaskDto } from "../../../domain/types";

interface TaskProps {
  task: TaskDto;
  onChanged: () => void;
}

export default function Task({ task, onChanged }: TaskProps) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { updateStatus } = useTaskStatus({ onStatusChanged: onChanged });

  return (
    <div className="task">
      <div className="checkbox">
        <label className="checkbox-btn">
          <label htmlFor="checkbox"></label>
          <input
            id="checkbox"
            type="checkbox"
            onChange={() => updateStatus(task.id, "Done")}
            checked={task.status === "Done"}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="task-details">
        <div className="grid">
          <p className="project-assigned">
            {">"}
            {task.project_name}
          </p>
          <h2 className="task__title">{task.name}</h2>
          <p className="task__deadline">{task.deadline ? new Date(task.deadline).toLocaleDateString() : ""}</p>
        </div>
        <p className="task__description">{task.description}</p>
      </div>

      <div className="task-controls">
        <span onClick={() => setShowDeleteModal(true)}>
          <i className="material-icons task-icon">close</i>
        </span>
        {task.status === "Not started" && (
          <span className="edit-status" onClick={() => updateStatus(task.id, "In progress")} title="Start Task">
            <i className="material-icons task-icon">arrow_forward</i>
          </span>
        )}
        {task.status === "In progress" && (
          <span className="edit-status" onClick={() => updateStatus(task.id, "Not started")} title="Change status to not started">
            <i className="material-icons task-icon">arrow_back</i>
          </span>
        )}
      </div>

      <DeleteTaskModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectId={task.project_id}
        taskId={task.id}
        onDeleted={onChanged}
      />
    </div>
  );
}
