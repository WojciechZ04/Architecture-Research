import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import EditProjectModal from "./EditProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import BorderLinearProgress from "../../../components/BorderLinearProgress";

interface ProjectData {
  id: string;
  name: string;
  deadline: string;
  status: string;
  roundedCompletionPercentage: number;
}

interface ProjectProps {
  project: ProjectData;
}

export default function Project({ project }: ProjectProps) {
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);

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

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div
      className={`project ${project.status}`}
      onMouseLeave={() => {
        setShowPanel(false);
      }}
    >
      <Link
        key={project.id}
        to={`/projects/${project.id}`}
        className="project-link"
      >
        <div className="project-content">
          <div className="project__title">
            <p>{project.name}</p>
          </div>
          <div className="project__deadline">
            <p>
              {project.deadline
                ? new Date(project.deadline).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="project__progress">
            <BorderLinearProgress
              className="border-linear-progress"
              variant="determinate"
              value={project.roundedCompletionPercentage}
            />
            <p>{project.roundedCompletionPercentage} %</p>
          </div>
        </div>
      </Link>
      <div className="project-action" ref={panelRef}>
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
        setShowModal={setShowDeleteModal}
        project={project}
      />
      <EditProjectModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        project={project}
      />
    </div>
  );
}