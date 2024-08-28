import React from "react";

const NavbarItem = ({ icon, label, onClick }) => (
  <div onClick={onClick}>
    <span>
      <i className="material-icons">{icon}</i>
      <span className="icon-text">{label}</span>
    </span>
  </div>
);

export default NavbarItem;
