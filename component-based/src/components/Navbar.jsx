import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Projects", "Tasks"];
const settings = ["Profile", "Settings", "Logout"];

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
    <div
      id="mySidebar"
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseOver={toggleSidebar}
      onMouseLeave={toggleSidebar}
    >
      <a onClick={() => handlePageChange('Home')}>
        <span>
          <i className="material-icons">info</i>
          <span className="icon-text">about</span>
        </span>
      </a>
      <br />
      <a onClick={() => handlePageChange('Tasks')}>
        <span>
          <i className="material-icons">spa</i>
          <span className="icon-text">services</span>
        </span>
      </a>
      <br />
      <a onClick={() => handlePageChange('Tasks')}>
        <span>
          <i className="material-icons">monetization_on</i>
          <span className="icon-text">clients</span>
        </span>
      </a>
      <br />
      <a onClick={() => handlePageChange('Projects')}>
        <span>
          <i className="material-icons">email</i>
          <span className="icon-text">contact</span>
        </span>
      </a>
    </div>
  );
}
