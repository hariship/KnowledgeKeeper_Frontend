import React from "react";
import icons from "../../assets/icons";
import "./tab-body-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";

const OpenRequestComponent = ({
  title,
  employee_name,
  date,
  aiEdits,
  onClick,
  onClickDelete,
}) => {
  const tooltipId = "open-request-tooltip";
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  return (
    <div className="open-request-container" onClick={onClick}>
      <div className="main-content">
        <p data-tooltip-id={tooltipId} data-tooltip-content={title}>{title}</p>
        <div className="main-content-row">
          <span>{employee_name}</span>
          <p>{formatDate(date)}</p>
        </div>
      </div>
      <div className="ai-edit">
        <span>{aiEdits}</span>
        <p>AI Edits</p>
      </div>
      <img
        className="delete-icon"
        src={icons.trashIcon}
        alt="icon"
        onClick={(e) => {
          e.stopPropagation();
          onClickDelete();
        }}
      />
       <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default OpenRequestComponent;
