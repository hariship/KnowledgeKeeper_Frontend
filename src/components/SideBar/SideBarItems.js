import "./sidebar-style.css";
import React from "react";

const SidebarItem = ({ title, icon: Icon, onClick, isActive }) => {
  return (
    <div
      className={`sidebar-item-wrapper ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className={`sidebar-item ${isActive ? "active" : ""}`}>
        <Icon className="prefix-sidebar-icon" />
        {title}
      </div>
    </div>
  );
};

export default SidebarItem;
