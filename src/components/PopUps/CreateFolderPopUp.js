import React, { useState } from "react";
import "./popup-style.css";
import HeaderSubHeadingComponent from "./CustomComponets";
import SvgCloseCross from "../../icons/CloseCross";
import { apiService } from "../../services/apiService";

const CreateFolderPopUp = ({
  selectedId,
  isVisible,
  title,
  subtitle,
  label,
  labelText,
  buttonText,
  onClose,
  onClick,
}) => {
  const [warningMessage, setWarningMessage] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  if (!isVisible) return null;
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setWarningMessage("");
  };

  const handleClosePopUp = () => {
    setInput("");
    setLoading(false);
    setWarningMessage("");
    onClose();
  };

  const handleButtonClick = async () => {
    setLoading(true);
    const nameExists = await handleNameExist();
    if (!nameExists) {
      setLoading(false);
      return;
    }
  
    await onClick(input); 
    setInput("");
    setLoading(false);
  };
  

  const handleNameExist = async () => {
    let isExist = false;

    if (title === "Create Folder") {
      isExist = await apiService.isFolderExist(input,selectedId);
    } else if (title === "Create Document") {
      isExist = await apiService.isDocumentExist(input,selectedId);
    }else if(title=="New teamspace"){
      isExist = await apiService.isTeamspaceExist(input);
    }

    if (!isExist) {
      setWarningMessage(`*${input} name already exists. Please choose a different name.*`);
      return false; 
    }

    return true; 
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
            /> {warningMessage && (
              <div className="warning-text">
                {warningMessage}
              </div>
            )}
          </label> 
        </div>
        <button
          className={`popup-button ${
            input.trim() || !loading ? "" : "disabled-button"
          }`}
          onClick={handleButtonClick}
          disabled={!input.trim() || loading}
        >
          {buttonText}
          {loading && (
            <span className="loader" style={{ marginLeft: "8px" }}></span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateFolderPopUp;
