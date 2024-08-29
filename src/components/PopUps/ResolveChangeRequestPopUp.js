import React from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";
import icons from "../../assets/icons";

const ResolveChangeRequestPopUp = ({
  isVisible,
  title,
  subtitle,
  onClickLButton,
  lButtonText,
  onClickRButton,
  rButtonText,
  onClose,
}) => {
  if (!isVisible) return null;
  return (
    <div
      className={`popup-overlay ${isVisible ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-row-space-between-header">
          <HeaderSubHeadingComponent title={title} subtitle={subtitle} />
          <img alt="close" src={icons.closeIcon} onClick={onClose} />
        </div>
        <div className="show-row-space-between-header">
          <button className="grey-button" onClick={onClickLButton}>
            {lButtonText}
          </button>
          <button className="teal-button" onClick={onClickRButton}>
            {rButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResolveChangeRequestPopUp;
