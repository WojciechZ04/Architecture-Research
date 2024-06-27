import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

// const pages = ["Home", "Projects", "Tasks"];
// const settings = ["Profile", "Settings", "Logout"];

export default function ResponsiveAppBar({ setMainMargin }) {
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState("85px");
  const [mini, setMini] = useState(true);

  const handlePageChange = (page) => {
    if (page === "Home") {
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const toggleSidebar = (event) => {
    let relatedTarget = event.relatedTarget;
    while (relatedTarget && relatedTarget !== event.currentTarget) {
      relatedTarget = relatedTarget.parentNode;
    }
    if (relatedTarget) return; // Mouse is still inside the div
  
    if (mini) {
      console.log("opening sidebar");
      setSidebarWidth("250px");
      setMainMargin("250px");
      setMini(false);
    } else {
      console.log("closing sidebar");
      setSidebarWidth("85px");
      setMainMargin("85px");
      setMini(true);
    }
  };

  return (
    //edit anchors!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    <div
      id="mySidebar"
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseOver={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <div onClick={() => handlePageChange('Home')}>
        <span>
          <i className="material-icons">home</i>
          <span className="icon-text">Home</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange('Projects')}>
        <span>
          <i className="material-icons">folder</i>
          <span className="icon-text">Projects</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange('Tasks')}>
        <span>
          <i className="material-icons">assignment</i>
          <span className="icon-text">Tasks</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange('Teams')}>
        <span>
          <i className="material-icons">people</i>
          <span className="icon-text">Teams</span>
        </span>
      </div>
      <div onClick={() => handlePageChange('Organizations')}>
        <span>
          <i className="material-icons">people</i>
          <span className="icon-text">Organizations</span>
        </span>
      </div>
    </div>
  );
}
