import {
  fetchProjectsFromAPI,
  processProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../models/ProjectModel";
import { useState, useRef } from "react";

export const fetchProjects = async (sortValue, setProjects) => {
  try {
    const data = await fetchProjectsFromAPI();
    const processedProjects = processProjects(data, sortValue);
    setProjects(processedProjects);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const filterAndSearchProjects = (projects, filterValue, searchTerm) => {
  const filteredProjects = projects.filter((project) => {
    if (filterValue === "all") return true;
    if (filterValue === "completed") {
      return project.tasks.every((task) => task.status === "Done");
    }
    if (filterValue === "active") {
      return (
        project.tasks.some(
          (task) => task.status === "In progress" || task.status === "Done"
        ) && !project.tasks.every((task) => task.status === "Done")
      );
    }
    if (filterValue === "inactive") {
      return !project.tasks.some(
        (task) => task.status === "In progress" || task.status === "Done"
      );
    }
    return true;
  });

  return filteredProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const handleCreateProject = async (
  projectData,
  fetchProjects,
  setOpen,
  resetForm,
  setError
) => {
  try {
    await createProject(projectData);
    fetchProjects();
    setOpen(false);
    resetForm();
  } catch (error) {
    setError(error.message);
    console.error(error);
  }
};

export const handleDeleteProject = async (projectId, setShowModal) => {
  try {
    const success = await deleteProject(projectId);
    if (success) {
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to delete project:", error);
  } finally {
    setShowModal(false);
  }
};

export const handleEditProject = async (
  projectId,
  projectData,
  setShowModal
) => {
  try {
    const success = await updateProject(projectId, projectData);
    if (success) {
      setShowModal(false);
      window.location.reload();
    }
  } catch (error) {
    console.error("Failed to update project:", error);
  }
};

export const useProjectController = () => {
  const [showPanel, setShowPanel] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const panelRef = useRef(null);

  const togglePanel = () => {
    setShowPanel(!showPanel);
  };

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

  const closePanelOnMouseLeave = () => {
    setShowPanel(false);
  };

  return {
    showPanel,
    showDeleteModal,
    showEditModal,
    panelRef,
    togglePanel,
    confirmDelete,
    confirmEdit,
    closePanelOnMouseLeave,
    setShowDeleteModal,
    setShowEditModal,
  };
};
