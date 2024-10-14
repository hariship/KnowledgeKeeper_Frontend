import React from "react";
import "./skeleton-loader-style.css";

const RecommendationSkeletonLoader = ({ count }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="skeleton-container-recom">
      {skeletons.map((_, index) => (
        <div className="suggestion-skeleton-container">
         
          <div key={index} className="skeleton-item-recom">
            <div className="skeleton-title-loader"></div>
            <div className="skeleton-content-loader"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationSkeletonLoader;
