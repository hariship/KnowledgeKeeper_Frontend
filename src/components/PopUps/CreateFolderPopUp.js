import React, { useState } from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";
import SvgCloseCross from "../../icons/CloseCross";

const CreateFolderPopUp = ({
  isVisible,
  title,
  subtitle,
  label,
  labelText,
  buttonText,
  onClose,
  onClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  if (!isVisible) return null;
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleClosePopUp = () => {
    setInput("");
    setLoading(false);
    onClose();
  };

  const handleButtonClick = async () => {
    setLoading(true);
    await onClick(input);
    setInput("");
    setLoading(false);
  };

  return (
    <div
      className={`popup-overlay ${isVisible ? "show" : ""}`}
      onClick={handleClosePopUp}
    >
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="show-column">
          <div className="show-row-space-between-header">
            <HeaderSubHeadingComponent title={title} subtitle={subtitle} />
            <SvgCloseCross className="cross-icon" onClick={handleClosePopUp} />
          </div>
          <label className="text-form-field-popup">
            {label}
            <input
              type="String"
              placeholder={labelText}
              maxLength={100}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button
          className={`popup-button ${input.trim()|| !loading? "" : "disabled-button"}`}
          onClick={handleButtonClick}
          disabled={!input.trim() || loading}
        >
          {buttonText} {loading && (
            <span className="loader" style={{ marginLeft: "8px" }}></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateFolderPopUp;
