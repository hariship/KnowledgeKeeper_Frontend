import React from "react";
import "./skeleton-loader-style.css";

//All Request
const SkeletonLoaderComponent = ({
  length = 10,
  itemClass = "default-skeleton-item",
  height,
  margin,
  padding = "20",
}) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          style={{
            height: `${height}px`,
            padding: `${padding}px`,
            margin:{margin}
          }}
          className={`skeleton-item ${itemClass}`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoaderComponent;
