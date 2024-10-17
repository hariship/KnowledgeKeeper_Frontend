import React from "react";
import "./tab-body-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";
import SvgDoneCheck from "../../icons/DoneCheck";

const ResolvedRequestComponent = ({ title, employee_name, date }) => {
  const tooltipId = "resolved-request-tooltip";
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
    <div className="open-request-container">
      <div className="header-title">
       <SvgDoneCheck  className="done-svg-icon"/> 
        <span data-tooltip-id={tooltipId} data-tooltip-content={title}>
          {title}
        </span>
      </div>
      <div className="header-detail">
        {employee_name} <span>|</span> {byteDate} {time}
      </div>
      <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default ResolvedRequestComponent;
