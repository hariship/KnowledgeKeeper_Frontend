import React, { useState } from "react";
import "./login-style.css";

const LoginButton = ({ icon, activeIcon, text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="login-button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          width: "32%",
        }}
      >

        <img
          className="login-button-icon"
          src={isHovered ? activeIcon : icon}
          alt="Feature icon"
        />
      </div>
      {text}
    </button>
  );
};

export default LoginButton;
