import React from "react";
import "./popup-style.css";
import icons from "../../assets/icons";
import HeaderSubHeadingComponent from "./CustomComponets";
const AddChangeRequestPopUp = ({ isVisible, onClick, onClose }) => {
  if (!isVisible) return null;
  return (
    <div className={`popup-overlay ${isVisible ? "show" : ""}`} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-row-space-between-header">
          <HeaderSubHeadingComponent
            title="Raise a Change Request"
            subtitle="Relax, AiEdits will help to resolve your requests"
          />
          <img alt="close" src={icons.closeIcon} onClick={onClose} />
        </div>
        <label className="text-form-field-popup">
          Write about your new request
          <textarea  className="add-request-form" type="String" placeholder="Add text..." />
        </label>
        <button className="popup-button" onClick={onClick}>
          New Request
        </button>
      </div>
    </div>
  );
};

export default AddChangeRequestPopUp;
