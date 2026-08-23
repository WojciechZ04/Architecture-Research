import { useState, useEffect, useCallback } from "react";
import Project from "./components/Project";
import DataControls from "./components/DataControls";
import CreateProjectModal from "./components/CreateProjectModal";
import "./Projects.css";

interface Task {
  id?: string;
  status: "To Do" | "In progress" | "Done";
}

interface ProjectData {
  id: string;
  name: string;
  deadline: string;
  tasks: Task[];
}

interface EnrichedProject extends ProjectData {
  roundedCompletionPercentage: number;
  status: "completed" | "active" | "inactive";
}

export default function Projects() {
  const [open, setOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<EnrichedProject[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("date-asc");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);

  const fetchProjects = useCallback(async() => {
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if(!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }

      const data: ProjectData[] = await response.json();

      const projectsWithCompletion: EnrichedProject[] = data.map((project) =>{
        const completedTasks = project.tasks.filter((task) => task.status === "Done").length;
        const totalTasks = project.tasks.length;
        const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        const roundedCompletionPercentage = Math.ceil(completionPercentage);

        let status: "completed" | "active" | "inactive" = "inactive";
        if (totalTasks > 0 && project.tasks.every((task) => task.status === "Done")) {
          status = "completed";
        } else if (
          totalTasks > 0 &&
          project.tasks.some((task) => task.status === "In progress" || task.status === "Done") &&
          !project.tasks.every((task) => task.status === "Done")
        ) {
          status = "active";
        }

        return { ...project, roundedCompletionPercentage, status };
      });

      const sortedData = sortProjects(projectsWithCompletion, sortValue);
      setProjects(sortedData);
    } catch (err: any) {
      console.error("Error fetching data: ", err);
      setError(err.message || "Nie udało się pobrać projektów");
    } finally {
      setIsLoading(false);
    }
  }, [sortValue]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const sortProjects = (projectsToSort: EnrichedProject[], value: string) => {
    return projectsToSort.sort((a, b) => {
      let fieldA: any, fieldB: any;
      const [criteria, direction] = value.split("-");

      if (criteria === "date") {
        fieldA = new Date(a.deadline).getTime();
        fieldB = new Date(b.deadline).getTime();
      } else if (criteria === "name") {
        fieldA = a.name.toLowerCase();
        fieldB = b.name.toLowerCase();
      }

      if (direction === "asc") {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    });
  };

  const onSortChange = (value: string) => {
    setSortValue(value);
    const sortedProjects = sortProjects([...projects], value);
    setProjects(sortedProjects);
  };

  const onFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const filteredProjects = projects.filter((project) => {
    if (filterValue === "all") return true;
    if (filterValue === "completed") return project.status === "completed";
    if (filterValue === "active") return project.status === "active";
    if (filterValue === "inactive") return project.status === "inactive";
    return true;
  });

  const searchedProjects = filteredProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

return (
    <div className="container">
      <div className="title">
        <h1>Projects</h1>
      </div>

      <div className="content">
        <DataControls
          onSearchChange={handleSearchChange}
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          sortValue={sortValue}
          filterValue={filterValue}
        />

        <div className="projects-grid">
          <div className="project-descriptions">
            <div>Name</div>
            <div>Deadline</div>
            <div>Progress</div>
          </div>
          
          {isLoading ? (
            <div className="loading-spinner">Pobieranie projektów z serwera...</div>
          ) : error ? (
            <div className="error-message">Błąd: {error}</div>
          ) : searchedProjects.length > 0 ? (
            <div className="projects">
              {searchedProjects.map((project, index) => (
                <Project key={index} project={project} />
              ))}
            </div>
          ) : (
            <div className="no-projects">No projects found.</div>
          )}
          
          <div className="new-project" onClick={handleOpen}>
            <p>Create a new project.</p>
          </div>
        </div>
      </div>
      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        fetchProjects={fetchProjects}
      />
    </div>
  );
}
