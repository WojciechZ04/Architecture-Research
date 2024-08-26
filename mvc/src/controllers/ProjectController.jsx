import { fetchProjectsFromAPI, processProjects } from "../models/ProjectModel";

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
