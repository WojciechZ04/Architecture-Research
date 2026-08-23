import { useEffect, useState, useCallback } from "react";
import Task from "./components/Task";
import Project from "./components/Project";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import "./Home.css";

interface UserData {
  username?: string;
}

interface TaskData {
  id: string;
  status: string;
  deadline?: string | null;
  project_id: string;
  name: string;
}

interface ProjectData {
  id: string;
  name: string;
  deadline: string;
  status: string;
}

interface EnrichedProjectData extends ProjectData {
  completionPercentage: number;
}

export default function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [projects, setProjects] = useState<EnrichedProjectData[]>([]);
  const [user, setUser] = useState<UserData>({});
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch("http://localhost:5000/api/home", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();
      setUser(data.users[0] || {});

      const filteredTasks: TaskData[] = data.tasks.filter(
        (task: TaskData) => task.status !== "Done"
      );
      const tasksWithDeadline = filteredTasks.filter((task) => task.deadline);
      const tasksWithoutDeadline = filteredTasks.filter((task) => !task.deadline);
      
      tasksWithDeadline.sort(
        (a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
      );
      
      const combinedTasks = [
        ...tasksWithDeadline,
        ...tasksWithoutDeadline,
      ].slice(0, 3);

      setTasks(combinedTasks);

      const projectsWithCompletion: EnrichedProjectData[] = data.projects.map((project: ProjectData) => {
        const projectTasks = data.tasks.filter(
          (task: TaskData) => task.project_id === project.id
        );
        const completedTasks = projectTasks.filter(
          (task: TaskData) => task.status === "Done"
        ).length;
        const totalTasks = projectTasks.length;
        const completionPercentage =
          totalTasks === 0 ? 0 : Math.ceil((completedTasks / totalTasks) * 100);
        
        return { ...project, completionPercentage };
      });

      setProjects(projectsWithCompletion);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError(err.message || "Wystąpił błąd podczas ładowania danych.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="container home">
      <h1>Welcome {user.username || "User"}</h1>
      <div className="home-wrapper">
        <div className="home-content">
          
          {isLoading ? (
            <p>Trwa ładowanie Twojego podsumowania...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <h2>Upcoming tasks</h2>
              <div className="home-tasks">
                {tasks.length === 0 ? (
                  <p>You don't have any tasks.</p>
                ) : (
                  tasks.map((task) => <Task key={task.id} task={task as any} />)
                )}
              </div>
              
              <h2>Active projects</h2>
              <div className="home-projects">
                {projects.length === 0 ? (
                  <p>You don't have any projects.</p>
                ) : (
                  projects.map((project) => (
                    <Project
                      key={project.id}
                      project={project}
                      completionPercentage={project.completionPercentage}
                    />
                  ))
                )}
              </div>
            </>
          )}

        </div>
        <div className="home-sidebar">
          <div className="home-sidebar-header">
            <i className="material-icons">notifications</i>
            <i className="material-icons" onClick={toggleCalendarVisibility}>
              calendar_month
            </i>
            <i className="material-icons" onClick={handleSignOut}>
              logout
            </i>
          </div>
          <div
            className={`calendar-container ${
              isCalendarVisible ? "visible" : ""
            }`}
          >
            <div className="calenar-wrapper">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar className="calendar" />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}