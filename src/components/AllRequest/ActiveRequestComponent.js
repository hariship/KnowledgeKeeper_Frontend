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
  const byteDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="open-request-container" onClick={onClick}>
      <div className="main-content">
        <p data-tooltip-id={tooltipId} data-tooltip-content={title}>{title}</p>
        <div className="main-content-row">
          <span>{employee_name}</span>
          <p>{byteDate} {time}</p>
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
