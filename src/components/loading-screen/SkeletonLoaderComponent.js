import React from "react";
import "./skeleton-loader-style.css";

const SkeletonLoaderComponent = ({ length = 10, itemClass = "default-skeleton-item" }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className={`skeleton-item ${itemClass}`}>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoaderComponent;
