import React, { useState } from "react";
import "./popup-style.css";
import icons from "../../assets/icons";
import HeaderSubHeadingComponent from "./CustomComponets";

const InviteMembersPopUp = ({ isVisible, onClose, onClick }) => {
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (validateEmail(trimmedValue) && !emails.includes(trimmedValue)) {
        setEmails([...emails, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const removeEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleClearAndClose = () => {
    setEmails([]);
    setInputValue("");
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`popup-overlay ${isVisible ? "show" : ""}`} onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-column">
          <div className="show-row-space-between-header">
            <HeaderSubHeadingComponent
              title="Invite Teammates"
              subtitle="Team members can read, edit, add and delete documents in your teamspace."
            />
            <img alt="close" src={icons.closeIcon} onClick={handleClearAndClose} />
          </div>
          <label className="input-form-field-popup">
            Email Id of your teammate
            <div className="email-input-container">
              {emails.map((email, index) => (
                <div className="email-tag" key={index}>
                  {email}
                  <img alt="close" style={{width:"16px",height:"16px"}} src={icons.closeIcon} className="remove-email" onClick={() => removeEmail(email)} />
                </div>
              ))}
              <input
                type="text"
                placeholder="you@companyname.com"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="email-input"
              />
            </div>
          </label>
        </div>
        <button className="popup-button" onClick={onClick}>
          Invite Teammates
        </button>
      </div>
    </div>
  );
};

export default InviteMembersPopUp;
