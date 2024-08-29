import icons from "../../assets/icons";
import React from "react";
import './tab-body-style.css';

const ResolvedRequestComponet = ({ title, employee_name, date, }) => {
    return (
        <div className="open-request-container">
            <div className="header-title"><img src={icons.doneIcon} alt="icon" />{title}</div>
            <div className="header-detail">
               {employee_name}      <span>|</span>   {date}
            </div>
        </div>);
}

export default ResolvedRequestComponet;