import React, { useState } from "react";
import "./login-style.css";

const LoginButton = ({ icon, activeIcon, text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    await delay(300);
    setLoading(false);
  };

  return (
    <button
      className={`login-button ${loading ? "active" : ""}`}
      onClick={loading ? null : handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={loading}
    >
      <div
       className="login-button-space"
      >
        <img
          className="login-button-icon"
          src={isHovered ? activeIcon : icon}
          alt="Feature icon"
        />
      </div>
      <span style={{ display: "flex", alignItems: "center" }}>
        {text}
        {loading && (
          <span className="button-loader"></span>
        )}
      </span>
    </button>
  );
};

export default LoginButton;
