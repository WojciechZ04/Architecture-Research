import React from "react";
import "./Navbar.css";

const ProfileDropdown = ({ isSidebarOpen, dropdownOpen, toggleDropdown, handlePageChange, handleSignOut }) => (
  <div className="navbar-avatar" onClick={toggleDropdown}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
      alt="Profile"
      className="avatar-image"
    />
    {dropdownOpen && isSidebarOpen && (
      <div className="dropdown-menu">
        <div onClick={() => handlePageChange("Profile")}>Profile</div>
        <div onClick={() => handlePageChange("Settings")}>Settings</div>
        <div onClick={handleSignOut}>Logout</div>
      </div>
    )}
  </div>
);

export default ProfileDropdown;
