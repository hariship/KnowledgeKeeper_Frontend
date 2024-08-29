import React from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";

const DeletePopUp = ({
  isVisible,
  title,
  subtitle,
  desc,
  onClick,
  onClose,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isVisible ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-column">
          <HeaderSubHeadingComponent title={title} subtitle={subtitle} />
          <p>{desc}</p>
        </div>
        <button className="delete-button" onClick={onClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
