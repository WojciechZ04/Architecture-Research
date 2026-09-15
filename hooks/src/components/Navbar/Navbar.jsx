/**
 * Navbar.jsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Jedyna zmiana logiczna względem smart-ui: handleSignOut korzysta teraz
 * ze wspólnego hooka useLogout() (ten sam, którego używa Home.tsx) zamiast
 * duplikować signOut()+navigate() lokalnie. Stan sidebar/dropdown to
 * czysty stan UI (widoczność elementów) - zgodnie z resztą wariantu
 * zostaje lokalnie w komponencie, bo to nie jest "logika biznesowa".
 */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

import "./Navbar.css";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { logout } = useLogout();
  const navigate = useNavigate();

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
          <div onClick={() => logout()}>Logout</div>
        </div>
      )}
    </div>
  );
}
