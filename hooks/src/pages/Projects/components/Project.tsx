/**
 * Project.tsx (wariant: hooks) - pojedynczy wiersz na liście projektów
 * -----------------------------------------------------------------------
 * Stan `showPanel` / `showDeleteModal` / `showEditModal` to czysty stan UI
 * (widoczność elementów), więc zgodnie z zasadą "hooki = logika biznesowa,
 * useState lokalny = stan widoku" ZOSTAJE w komponencie - nie każdy
 * useState trzeba wynosić do custom hooka.
 *
 * Nowość względem smart-ui: przyjmuje `onChanged` (czyli `refetch` z
 * useProjects()) i przekazuje go dalej do modali edycji/usuwania jako
 * `onUpdated` / `onDeleted`, żeby lista odświeżyła się po zmianie -
 * patrz komentarz w useEditProject.ts / useDeleteProject.ts o ujednoliceniu
 * z window.location.reload().
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import BorderLinearProgress from "../../../components/BorderLinearProgress";
import { EnrichedProject } from "../../../domain/types";

interface ProjectProps {
  project: EnrichedProject;
  onChanged: () => void;
}

export default function Project({ project, onChanged }: ProjectProps) {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const confirmDelete = () => {
    setShowPanel(false);
    setShowDeleteModal(true);
    setShowEditModal(false);
  };

  const confirmEdit = () => {
    setShowPanel(false);
    setShowEditModal(true);
    setShowDeleteModal(false);
  };

  const togglePanel = () => setShowPanel(!showPanel);

  return (
    <div className={`project ${project.status}`} onMouseLeave={() => setShowPanel(false)}>
      <Link to={`/projects/${project.id}`} className="project-link">
        <div className="project-content">
          <div className="project__title">
            <p>{project.name}</p>
          </div>
          <div className="project__deadline">
            <p>{project.deadline ? new Date(project.deadline).toLocaleDateString() : "-"}</p>
          </div>
          <div className="project__progress">
            <BorderLinearProgress
              className="border-linear-progress"
              variant="determinate"
              value={project.completionPercentage}
            />
            <p>{project.completionPercentage} %</p>
          </div>
        </div>
      </Link>
      <div className="project-action">
        <span onClick={togglePanel}>
          <i className="material-icons">more_vert</i>
        </span>
        {showPanel && (
          <div className="selection-panel">
            <div onClick={confirmEdit}>Edit</div>
            <div onClick={confirmDelete}>Delete</div>
          </div>
        )}
      </div>

      <DeleteProjectModal
        showModal={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        projectId={project.id}
        onDeleted={onChanged}
      />
      <EditProjectModal
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        project={project}
        onUpdated={onChanged}
      />
    </div>
  );
}
