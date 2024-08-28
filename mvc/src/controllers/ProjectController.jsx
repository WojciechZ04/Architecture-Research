import {
  fetchProjectsFromAPI,
  processProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../models/ProjectModel";
import { useState, useRef } from "react";

// Function to calculate project status based on tasks
export const getProjectStatus = (project) => {
  if (
    project.tasks.length > 0 &&
    project.tasks.every((task) => task.status === "Done")
  ) {
    return "completed";
  }
  if (
    project.tasks.length > 0 &&
    project.tasks.some(
      (task) => task.status === "In progress" || task.status === "Done"
    ) &&
    !project.tasks.every((task) => task.status === "Done")
  ) {
    return "active";
  }
  return "inactive";
};

// Fetch projects and add status to each project
export const fetchProjects = async (sortValue, setProjects) => {
  try {
    const data = await fetchProjectsFromAPI();
    const processedProjects = processProjects(data, sortValue);
    
    // Add status to each project
    const projectsWithStatus = processedProjects.map((project) => ({
      ...project,
      status: getProjectStatus(project),
    }));

    setProjects(projectsWithStatus);
    console.log(projectsWithStatus);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Filter and search projects by status and name
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

// Handle project creation
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

// Handle project deletion
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

// Handle project editing
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

// Custom hook for managing project-related UI states
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
