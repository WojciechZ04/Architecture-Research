import React, { useState } from "react";
import "./Navbar.css";
import { useNavbarController } from "../../../controllers/NavbarController";
import NavbarItem from "./NavbarItem";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { handlePageChange, handleSignOut } = useNavbarController();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
    setDropdownOpen(false);
  };

  const sidebarItems = [
    { icon: "home", label: "Home", page: "Home" },
    { icon: "folder", label: "Projects", page: "Projects" },
    { icon: "assignment", label: "Tasks", page: "Tasks" },
  ];

  return (
    <div
      id="mySidebar"
      className="sidebar"
      onMouseOver={() => setIsSidebarOpen(true)}
      onMouseLeave={handleMouseLeave}
    >
      {sidebarItems.map((item, index) => (
        <NavbarItem
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={() => handlePageChange(item.page)}
        />
      ))}
      <br />
      <ProfileDropdown
        isSidebarOpen={isSidebarOpen}
        dropdownOpen={dropdownOpen}
        toggleDropdown={toggleDropdown}
        handlePageChange={handlePageChange}
        handleSignOut={handleSignOut}
      />
    </div>
  );
}
