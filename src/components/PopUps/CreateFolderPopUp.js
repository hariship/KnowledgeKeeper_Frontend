import React from "react";
import "./popup-style.css";
import icons from "../../assets/icons";
import HeaderSubHeadingComponent from "./CustomComponets";

const CreateFolderPopUp = ({
  isVisible,
  title,
  subtitle,
  label,
  labelText,
  buttonText,
  onClose,
  onClick,
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`popup-overlay ${isVisible ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-column">
          {" "}
          <div className="show-row-space-between-header">
            <HeaderSubHeadingComponent title={title} subtitle={subtitle} />
            <img alt="close" src={icons.closeIcon} onClick={onClose} />
          </div>
          <label className="text-form-field-popup">
            {label}
            <input type="String" placeholder={labelText} maxLength={100} />
          </label>
        </div>
        <button className="popup-button" onClick={onClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CreateFolderPopUp;
