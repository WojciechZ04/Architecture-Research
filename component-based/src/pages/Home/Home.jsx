import React, { useEffect, useState } from "react";
import Task from "./components/Task";
import "./Home.css";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/home", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.users[0]);
        const filteredTasks = data.tasks.filter(task => task.status !== 'Done');
        const sortedTasks = filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 3);
        
        setTasks(sortedTasks);
        setProjects(data.projects);
      });
  }, []);


  return (
    <div className="container home">
      <h1>Welcome {user.username}</h1>
      <div className="home-wrapper">
        <div className="home-content">
          <h2>Upcoming tasks</h2>
          <div className="home-tasks">
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
          <h2>Active projects</h2>
          <div className="home-projects"></div>
        </div>
        <div className="home-sidebar">
          <i className="material-icons">notifications</i>
          <p>[calendar]</p>
          <i className="material-icons">logout</i>
        </div>
      </div>
    </div>
  );
}
