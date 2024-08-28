import React from "react";
import icons from "../../assets/icons";

const OpenRequestComponent = ({ title, employee_name, date, aiEdits }) => {
    return (
        <div className="open-request-container">
            <div className="main-content">
                <p>{title}</p>
                <div className="main-content-row">
                    <p>{employee_name}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div className="ai-edit">
                <span>{aiEdits}</span>
                <p>AI Edits</p>
            </div>
            <img className="delete-icon" src={icons.trashIcon} alt="icon" />
        </div>
    );
};

export default OpenRequestComponent;
