/**
 * Home.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * fetchDashboardData + wyliczenia przeniesione do useHomeDashboard().
 * handleSignOut przeniesione do useLogout() (wspólny hook z Navbar).
 * `isCalendarVisible` to czysty stan UI - zostaje lokalnie.
 */
import { useState } from "react";
import Task from "./components/Task";
import Project from "./components/Project";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useHomeDashboard } from "../../hooks/useHomeDashboard";
import { useLogout } from "../../hooks/useLogout";
import "./Home.css";

export default function Home() {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const { user, tasks, projects, isLoading, error } = useHomeDashboard();
  const { logout } = useLogout();

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
                  tasks.map((task) => <Task key={task.id} task={task} />)
                )}
              </div>

              <h2>Active projects</h2>
              <div className="home-projects">
                {projects.length === 0 ? (
                  <p>You don't have any projects.</p>
                ) : (
                  projects.map((project) => (
                    <Project key={project.id} project={project} completionPercentage={project.completionPercentage} />
                  ))
                )}
              </div>
            </>
          )}
        </div>
        <div className="home-sidebar">
          <div className="home-sidebar-header">
            <i className="material-icons">notifications</i>
            <i className="material-icons" onClick={() => setIsCalendarVisible(!isCalendarVisible)}>
              calendar_month
            </i>
            <i className="material-icons" onClick={logout}>
              logout
            </i>
          </div>
          <div className={`calendar-container ${isCalendarVisible ? "visible" : ""}`}>
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
