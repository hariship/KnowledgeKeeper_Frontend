import React from "react";
import "./skeleton-loader-style.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
      <div className="welcome-text">
        <h1>Hi, Welcome!</h1>
        <p>ADD NEW LINE(DUMMY DATA).</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
