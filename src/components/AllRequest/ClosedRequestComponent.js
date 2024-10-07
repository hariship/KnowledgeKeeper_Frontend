import React from "react";
import "./tab-body-style.css";
import CustomTooltip from "../PopUps/CustomToolTip";
import SvgDoneCheck from "../../icons/DoneCheck";

const ResolvedRequestComponent = ({ title, employee_name, date }) => {
  const tooltipId = "resolved-request-tooltip";
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };
  return (
    <div className="open-request-container">
      <div className="header-title">
       <SvgDoneCheck  className="done-svg-icon"/> 
        <span data-tooltip-id={tooltipId} data-tooltip-content={title}>
          {title}
        </span>
      </div>
      <div className="header-detail">
        {employee_name} <span>|</span> {formatDate(date)}
      </div>
      <CustomTooltip id={tooltipId} />
    </div>
  );
};

export default ResolvedRequestComponent;
