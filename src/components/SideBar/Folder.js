import React, { useState, useEffect, useRef } from "react";
import "../../style.css";
import "./sidebar-style.css";
import icons from "../../assets/icons";
import truncateText from "../../custom/useTruncateText";
import DropdownMenu from "../PopUps/DropDown";

const dropdownOptions = [
  { label: "Rename", icon: icons.renameIcon },
  { label: "Move To Trash", icon: icons.trashIcon },
];

const TeamSpace = ({
  title,
  folderList,
  onClickCreateTeam,
  onClickCreateFolder,
  onClickCreateDoc,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({});
  const [adjustedTitle, setAdjustedTitle] = useState(title);
  const titleRef = useRef(null);
  const teamSpaceRef = useRef(null); // Create a ref for TeamSpace component

  const toggleOpen = () => {
    if (folderList && folderList.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const teamSpaceRect = teamSpaceRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: teamSpaceRect.top + window.scrollY,
      left: window.scrollX + teamSpaceRect.width - rect.width,
    });
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleDropdownSelect = (option) => {
    console.log("Selected option:", option.label);
    setShowDropdown(false);
  };

  useEffect(() => {
    const adjustTitle = () => {
      const element = titleRef.current;
      const availableWidth = element.offsetWidth;
      const text = title;
      setAdjustedTitle(truncateText(text, availableWidth, element));
    };

    adjustTitle();
    window.addEventListener("resize", adjustTitle);

    return () => {
      window.removeEventListener("resize", adjustTitle);
    };
  }, [title]);

  return (
    <div className="team-space" ref={teamSpaceRef}>
      <div className="show-row-space-between" onClick={toggleOpen}>
        <div className="folder-header">
          <span ref={titleRef} className="folder-title">
            {adjustedTitle}
          </span>
        </div>
        <img
          className="hide-icon"
          alt="menu"
          src={icons.menuIcon}
          onClick={handleMenuClick}
        />
        {showDropdown && (
          <DropdownMenu
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
            options={dropdownOptions}
            onSelect={handleDropdownSelect}
          />
        )}
        <img alt="add" src={icons.addIcon} onClick={onClickCreateTeam} />
      </div>
      {isOpen && folderList && folderList.length > 0 && (
        <div className="folder-contents">
          {folderList.map((e, index) => (
            <Folder
              key={index} // Add a key prop
              title={e.folder_name}
              docList={e.documents}
              onClickCreateDoc={onClickCreateDoc}
              onClickCreateFolder={onClickCreateFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSpace;

const Folder = ({ title, docList, onClickCreateFolder, onClickCreateDoc }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adjustedTitle, setAdjustedTitle] = useState(title);
  const [adjustedDocList, setAdjustedDocList] = useState([]);
  const titleRef = useRef(null);

  const toggleOpen = () => {
    if (docList && docList.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const adjustTitle = () => {
      const element = titleRef.current;
      const availableWidth = element.offsetWidth;
      const text = title;
      setAdjustedTitle(truncateText(text, availableWidth, element));
    };

    adjustTitle();
    window.addEventListener("resize", adjustTitle);

    return () => {
      window.removeEventListener("resize", adjustTitle);
    };
  }, [title]);

  useEffect(() => {
    const adjustDocNames = () => {
      const tempList = [];
      const testSpan = document.createElement("span");
      document.body.appendChild(testSpan);
      docList.forEach((doc) => {
        testSpan.textContent = doc.doc_name;
        const adjustedName = truncateText(
          doc.doc_name,
          testSpan.offsetWidth,
          testSpan
        );
        tempList.push({ ...doc, adjustedName });
      });

      document.body.removeChild(testSpan);
      setAdjustedDocList(tempList);
    };

    adjustDocNames();
    window.addEventListener("resize", adjustDocNames);

    return () => {
      window.removeEventListener("resize", adjustDocNames);
    };
  }, [docList]);

  return (
    <div className="folder">
      <div className="show-row-space-between">
        <div onClick={toggleOpen} className="folder-header">
          <img alt="folder" src={icons.folderIcon} />
          <span ref={titleRef} className="folder-title">
            {adjustedTitle}
          </span>
        </div>
        <img alt="menu" src={icons.menuIcon} className="hide-icon" />
        <img alt="add" src={icons.addIcon} onClick={onClickCreateFolder} />
      </div>
      {isOpen && adjustedDocList && adjustedDocList.length > 0 && (
        <div className="folder-contents">
          {adjustedDocList.map((e, index) => (
            <div className="show-row-space-between">
              {" "}
              <div className="document-content" key={index}>
                <img src={icons.documentIcon} alt="doc" />
                <span className="folder-title">{e.adjustedName}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={icons.menuIcon} alt="doc" />
                <img
                  src={icons.addIcon}
                  className="hide-icon"
                  alt="doc"
                  onClick={onClickCreateDoc}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
