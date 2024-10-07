import React, { useState } from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";

const DeletePopUp = ({
  isVisible,
  title,
  subtitle,
  buttonText,
  desc,
  onClick,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOnDelete = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };
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
        <button
          className={`delete-button ${loading ? "loading" : ""}`}
          onClick={handleOnDelete}
          disabled={loading}
        >
          {buttonText}
          {loading && (
            <span className="loader" style={{ marginLeft: "8px" }}></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
