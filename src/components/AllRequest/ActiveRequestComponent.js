import React from "react";
import icons from "../../assets/icons";
import "./tab-body-style.css";

const OpenRequestComponent = ({
  title,
  employee_name,
  date,
  aiEdits,
  onClick,
  onClickDelete,
}) => {
  const truncatedTitle = title.length > 80 ? `${title.substring(0, 80)}...` : title;

  return (
    <div className="open-request-container" onClick={onClick}>
      <div className="main-content">
        <p>{truncatedTitle}</p>
        <div className="main-content-row">
          <span>{employee_name}</span>
          <p>{date}</p>
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
    </div>
  );
};

export default OpenRequestComponent;
