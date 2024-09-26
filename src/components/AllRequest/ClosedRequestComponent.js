import React from "react";
import icons from "../../assets/icons";
import "./tab-body-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";

const ResolvedRequestComponent = ({ title, employee_name, date }) => {
  const tooltipId = "resolved-request-tooltip";
  return (
    <div className="open-request-container">
      <div className="header-title">
        <img
        className="done-icon"
          src={icons.doneIcon}
          alt="icon"
        />
        <span data-tooltip-id={tooltipId} data-tooltip-content={title}>
          {title}
        </span>
      </div>
      <div className="header-detail">
        {employee_name} <span>|</span> {date}
      </div>
      <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default ResolvedRequestComponent;
