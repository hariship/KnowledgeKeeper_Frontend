import React, { useState } from 'react';
import './login-style.css';

const LoginButton = ({ icon, activeIcon, text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="login-button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={isHovered ? activeIcon : icon} alt="Feature icon" />
      <span>{text}</span>
    </button>
  );
};

export default LoginButton;
