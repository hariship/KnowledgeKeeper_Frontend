import React, { useState } from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";
import SvgCloseCross from "../../icons/CloseCross";
import { toast } from "react-toastify";
import { apiService } from "../../services/apiService";

const AddChangeRequestPopUp = ({ isVisible, onClose ,onClick}) => {
  const [recommendation, setRecommendation] = useState("");

  const handleNewRequest = async () => {
    if (!recommendation) {
      toast.error("Please write a request");
      return;
    }
    const data = await apiService.createChangeRequest(recommendation);
    console.log(data);
   await onClick();
   await onClose();
  };
  if (!isVisible) return null;
  return (
    <div
      className={`popup-overlay ${isVisible ? "show" : ""}`}
      onClick={onClose}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-row-space-between-header">
          <HeaderSubHeadingComponent
            title="Raise a Change Request"
            subtitle="Relax, AiEdits will help to resolve your requests"
          />
          <SvgCloseCross className="cross-icon" onClick={onClose} />
        </div>
        <label className="text-form-field-popup">
          Write about your new request
          <textarea
            className="add-request-form"
            type="String"
            placeholder="Add text..."
            onChange={(e) => setRecommendation(e.target.value)}
          />
        </label>
        <button className="popup-button" onClick={handleNewRequest}>
          New Request
        </button>
      </div>
    </div>
  );
};

export default AddChangeRequestPopUp;
