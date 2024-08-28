import React from 'react';
import '../../style.css';

const SidebarItem = ({ title, icon, onClick }) => {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <img src={icon} alt='icon' />
      <span>{title}</span>
    </div>
  );
};

export default SidebarItem;
