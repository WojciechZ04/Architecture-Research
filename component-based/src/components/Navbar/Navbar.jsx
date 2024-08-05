import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";

import "./Navbar.css";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const signOut = useSignOut();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handlePageChange = (page) => {
    if (page === "Home") {
      navigate("/");
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
    setDropdownOpen(false);
  };

  return (
    //edit anchors!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    <div
      id="mySidebar"
      className="sidebar"
      onMouseOver={() => setIsSidebarOpen(true)}
      onMouseLeave={() => handleMouseLeave(false)}
    >
      <div onClick={() => handlePageChange("Home")}>
        <span>
          <i className="material-icons">home</i>
          <span className="icon-text">Home</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange("Projects")}>
        <span>
          <i className="material-icons">folder</i>
          <span className="icon-text">Projects</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange("Tasks")}>
        <span>
          <i className="material-icons">assignment</i>
          <span className="icon-text">Tasks</span>
        </span>
      </div>
      <br />
      {/* <div onClick={() => handlePageChange('Teams')}>
        <span>
          <i className="material-icons">people</i>
          <span className="icon-text">Teams</span>
        </span>
      </div>
      <br />
      <div onClick={() => handlePageChange('Organizations')}>
        <span>
          <i className="material-icons">work</i>
          <span className="icon-text">Organizations</span>
        </span>
      </div>
      <br /> */}

      <div className="navbar-avatar" onClick={toggleDropdown}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          alt="Profile"
          className="avatar-image"
        />
      </div>
      {dropdownOpen && isSidebarOpen && (
        <div className="dropdown-menu">
          <div onClick={() => handlePageChange("Profile")}>Profile</div>
          <div onClick={() => handlePageChange("Settings")}>Settings</div>
          <div onClick={() => signOut()}>Logout</div>
        </div>
      )}
    </div>
  );
}
