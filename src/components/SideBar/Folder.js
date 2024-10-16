import React, { useState, useEffect, useRef } from "react";
import "../../style.css";
import "./sidebar-style.css";
import icons from "../../assets/icons";
import DropdownMenu from "../PopUps/DropDown";
import RenamePopUp from "../PopUps/RenamePopUp";
import CustomTooltip from "../PopUps/CustomToolTip";
import { apiService } from "../../services/apiService";
import SvgAddIcon from "../../icons/AddIcon";
import SvgRename from "../../icons/Rename";
import SvgTrash from "../../icons/Trash";
import SvgActiveDoc from "../../icons/ActiveDoc";
import SvgDocumentIcon from "../../icons/DocumentIcon";
import SvgActiveFolder from "../../icons/ActiveFolder";
import SvgActiveRightArrow from "../../icons/ActiveRightArrow";
import SvgFolderIcon from "../../icons/FolderIcon";
import SvgAddMember from "../../icons/AddMember";
import SvgActiveTeam from "../../icons/ActiveTeam";
import SvgTeamspace from "../../icons/Teamspace";

const TeamSpace = ({
  teamspaceId,
  title,
  folderList = [],
  onClickCreateFolder,
  onClickCreateDoc,
  onClickDocument,
  handleOpenFolderDeletePopup,
  handleopendocumentdeletepopup,
  handleOpenDeleteTeamspacePopup,
  handleOpenInvitePopUp,
  activeItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [teamSpaceTitle, setTitle] = useState(title);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const teamSpaceRef = useRef(null);
  const menuRef = useRef(null);
  const tooltipId = "teamspace-tooltip";
  useEffect(() => {
    const isActiveInTeam = folderList.some((folder) =>
      folder.documents.some((doc) => doc.id === activeItem)
    );
    if (isActiveInTeam) setIsOpen(true);
  }, [activeItem, folderList]);

  const toggleOpen = () => {
    if (folderList && folderList.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  const handleDeleteOpenPopup = () => {
    handleCloseMenu();
    handleOpenDeleteTeamspacePopup();
  };
  const handleInviteOpenPopup = () => {
    handleCloseMenu();
    handleOpenInvitePopUp();
  };

  const handleCloseMenu = () => {
    setShowDropdown(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleAddClick = () => {
    onClickCreateFolder();
  };

  const handleUpdateRename = async () => {
    await apiService.renameTeamspace(teamSpaceTitle, teamspaceId);
  };

  const handleOpenRenamePopUp = () => {
    handleCloseMenu();
    setIsRenameVisible(true);
  };

  const handleCloseRenamePopUp = () => {
    handleUpdateRename();
    setIsRenameVisible(false);
  };

  const dropdownOptions = [
    {
      label: "Invite Teammates",
      icon: SvgAddMember,
      onClick: handleInviteOpenPopup,
    },
    {
      label: "Rename",
      icon: SvgRename,
      onClick: handleOpenRenamePopUp,
    },
    {
      label: "Delete",
      icon: SvgTrash,
      onClick: handleDeleteOpenPopup,
    },
  ];

  const CurrentIcon = isHovered
    ? isOpen
      ? SvgActiveTeam
      : SvgActiveRightArrow
    : SvgTeamspace;

  return (
    <div>
      {/*Kebab Menu*/}
      {showDropdown && (
        <DropdownMenu
          referenceElement={menuRef.current}
          exceptionRef={menuRef}
          options={dropdownOptions}
          onClose={handleCloseMenu}
        />
      )}

      {/*Rename*/}
      {isRenameVisible && (
        <RenamePopUp
          title={teamSpaceTitle}
          setTitle={setTitle}
          referenceElement={teamSpaceRef.current}
          onClose={handleCloseRenamePopUp}
          exceptionRef={teamSpaceRef}
        />
      )}
      <CustomTooltip id={tooltipId} />
      <div
        data-tooltip-id={tooltipId}
        data-tooltip-content={title}
        className="show-row-space-between"
        onClick={toggleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="teamspace-header">
          <CurrentIcon className="default-img-icon" />
          <span
            ref={teamSpaceRef}
            className={`folder-title ${isHovered ? "active" : ""}`}
          >
            {teamSpaceTitle}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            className="hide-icon"
            alt="menu"
            ref={menuRef}
            src={icons.activeMenuIcon}
            onClick={handleMenuClick}
          />
          <SvgAddIcon className="hide-icon" onClick={handleAddClick} />
        </div>
      </div>
      {isOpen && folderList && folderList.length > 0 && (
        <div>
          {folderList.map((e, index) => (
            <Folder
              key={index}
              folderId={e.id}
              title={e.folderName}
              docList={e.documents}
              onClickCreateDoc={onClickCreateDoc}
              onClickDocument={onClickDocument}
              handleOpenFolderDeletePopup={() =>
                handleOpenFolderDeletePopup(e.id)
              }
              handleopendocumentdeletepopup={handleopendocumentdeletepopup}
              activeItem={activeItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSpace;

/************************************************ FOLDER ***************************************/

const Folder = ({
  folderId,
  title,
  docList,
  onClickCreateDoc,
  onClickDocument,
  handleOpenFolderDeletePopup,
  handleopendocumentdeletepopup,
  activeItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [folderTitle, setTitle] = useState(title);
  const menuRef = useRef(null);
  const titleRef = useRef(null);
  const tooltipId = "folder-tooltip";
  useEffect(() => {
    const isActiveInFolder = docList.some(
      (doc) => String(doc.id) === String(activeItem)
    );
    if (isActiveInFolder) setIsOpen(true);
  }, [activeItem, docList]);
  const toggleOpen = () => {
    if (docList && docList.length > 0) {
      setIsOpen(!isOpen);
    }
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowDropdown(false);
  };
  const CurrentIcon = isHovered
    ? isOpen
      ? SvgActiveFolder
      : SvgActiveRightArrow
    : SvgFolderIcon;

  const handleAddDocClick = (e) => {
    e.stopPropagation();
    onClickCreateDoc(folderId);
  };
  const handleOpenDeletePopup = () => {
    handleCloseMenu();
    handleOpenFolderDeletePopup(folderId);
  };

  const handleUpdateRename = async () => {
    await apiService.renameFolder(folderTitle, folderId);
  };

  const handleOpenRenamePopUp = () => {
    handleCloseMenu();
    setIsRenameVisible(true);
  };

  const handleCloseRenamePopUp = () => {
    handleUpdateRename();
    setIsRenameVisible(false);
  };
  const dropdownOptions = [
    {
      label: "Rename",
      icon: SvgRename,
      onClick: handleOpenRenamePopUp,
    },
    {
      label: "Delete",
      icon: SvgTrash,
      onClick: handleOpenDeletePopup,
    },
  ];

  return (
    <div>
      <div
        className="show-row-space-between"
        data-tooltip-id={tooltipId}
        data-tooltip-content={title}
        onClick={toggleOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="folder-header">
          <CurrentIcon className="default-img-icon" />
          <span
            ref={titleRef}
            className={`folder-title ${isHovered ? "active" : ""}`}
          >
            {folderTitle}
          </span>
        </div>
        <img
          alt="menu"
          onClick={handleMenuClick}
          ref={menuRef}
          src={icons.activeMenuIcon}
          className="hide-icon"
        />
        <CustomTooltip id={tooltipId} />
        <SvgAddIcon className="hide-icon" onClick={handleAddDocClick} />
      </div>
      {isOpen && docList && docList.length > 0 && (
        <div>
          {docList.map((e, index) => (
            <Document
              key={index}
              docId={e.id}
              name={e.documentName}
              handleopendocumentdeletepopup={handleopendocumentdeletepopup}
              onClickDocument={onClickDocument}
              activeItem={activeItem}
            />
          ))}
        </div>
      )}
      {showDropdown && (
        <DropdownMenu
          referenceElement={menuRef.current}
          options={dropdownOptions}
          onClose={handleCloseMenu}
          exceptionRef={menuRef}
        />
      )}
      {/*Rename*/}
      {isRenameVisible && (
        <RenamePopUp
          title={folderTitle}
          referenceElement={titleRef.current}
          onClose={handleCloseRenamePopUp}
          exceptionRef={titleRef}
          setTitle={setTitle}
        />
      )}
    </div>
  );
};

// export default Folder;

/**********************************************DOCUMENT************************************8*/

const Document = ({
  docId,
  name,
  onClickDocument,
  activeItem,
  handleopendocumentdeletepopup,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isRenameVisible, setIsRenameVisible] = useState(false);
  const [docTitle, setDoc] = useState(name);
  const menuRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (String(activeItem) === String(docId)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeItem, docId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setShowDropdown(false);
  };
  const handleOpenDeletePopup = (e) => {
    handleCloseMenu();
    handleopendocumentdeletepopup(docId);
  };

  const handleOpenRenamePopUp = () => {
    handleCloseMenu();
    setIsRenameVisible(true);
  };

  const handleCloseRenamePopUp = () => {
    handleUpdateRename();
    setIsRenameVisible(false);
  };

  const dropdownOptions = [
    {
      label: "Rename",
      icon: SvgRename,
      onClick: handleOpenRenamePopUp,
    },
    {
      label: "Delete",
      icon: SvgTrash,
      onClick: handleOpenDeletePopup,
    },
  ];
  const CurrentIcon = isHovered || isActive ? SvgActiveDoc : SvgDocumentIcon;
  const tooltipId = "document-tooltip";

  const handleUpdateRename = async () => {
    await apiService.renameDocument(docTitle, docId);
  };
  return (
    <div
      className={`show-row-space-between ${
        isHovered || isActive ? "active" : ""
      }`}
      onClick={() => onClickDocument(docId)}
      data-tooltip-id={tooltipId}
      data-tooltip-content={docTitle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: "relative" }}
    >
      {/*Kebab Menu*/}
      {showDropdown && (
        <DropdownMenu
          referenceElement={menuRef.current}
          options={dropdownOptions}
          onClose={handleCloseMenu}
          exceptionRef={menuRef}
        />
      )}
      {/*Rename*/}
      {isRenameVisible && (
        <RenamePopUp
          title={docTitle}
          referenceElement={titleRef.current}
          onClose={handleCloseRenamePopUp}
          exceptionRef={titleRef}
          setTitle={setDoc}
        />
      )}

      <CustomTooltip id={tooltipId} place="right" />
      <div className="document-content">
        <CurrentIcon className="default-img-icon" />
        <span
          ref={titleRef}
          className={`folder-title ${isHovered || isActive ? "active" : ""}`}
        >
          {docTitle}
        </span>
      </div>
      <img
        ref={menuRef}
        src={icons.activeMenuIcon}
        alt="doc"
        className="hide-icon"
        onClick={handleMenuClick}
      />
    </div>
  );
};
