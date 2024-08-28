import React, { useEffect, useState } from "react";
import Task from "./components/Task";
import Project from "./components/Project";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { loadHomeData } from "../../../controllers/HomeController";
import "./Home.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const signOut = useSignOut();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  const toggleCalendarVisibility = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  useEffect(() => {
    loadHomeData(setUser, setTasks, setProjects);
  }, []);

  return (
    <div className="container home">
      <h1>Welcome {user.username}</h1>
      <div className="home-wrapper">
        <div className="home-content">
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
                <Project
                  key={project.id}
                  project={project}
                  completionPercentage={project.completionPercentage}
                />
              ))
            )}
          </div>
        </div>
        <div className="home-sidebar">
          <div className="home-sidebar-header">
            <i className="material-icons">notifications</i>
            <i className="material-icons" onClick={toggleCalendarVisibility}>
              calendar_month
            </i>
            <i className="material-icons" onClick={() => handleSignOut()}>
              logout
            </i>
          </div>
          <div
            className={`calendar-container ${
              isCalendarVisible ? "visible" : ""
            }`}
          >
            <div className="calendar-wrapper">
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
