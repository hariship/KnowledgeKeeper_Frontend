import "./sidebar-style.css";
import React, { useState } from "react";

const SidebarItem = ({ title, icon, activeIcon, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const currentIcon = isActive || isHovered ? activeIcon : icon;
  return (
    <div
      className={`sidebar-item-wrapper ${isActive ? "active" : ""}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`sidebar-item ${isActive ? "active" : ""}`}>
        <img src={currentIcon} alt="icon" />
        {title}
      </div>
    </div>
  );
};

export default SidebarItem;
