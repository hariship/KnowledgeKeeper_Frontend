import React, { useState, useEffect, useRef } from "react";
import "../../style.css";
import "./sidebar-style.css";
import icons from "../../assets/icons";
import DropdownMenu from "../PopUps/DropDown";
import RenamePopUp from "../PopUps/RenamePopUp";
// import InviteMemebersPopUp from "../PopUps/InviteMembersPopUp";
import CustomTooltip from "../PopUps/CustomToolTip";
import { apiService } from "../../services/apiService";

// const TeamSpace = ({
//   title,
//   folderList,
//   onClickCreateFolder,
//   onClickCreateDoc,
//   onClickDocument,
//   activeItem,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
//   const [isRenameVisible, setIsRenameVisible] = useState(false);
//   const [isInviteMemberPopupVisible, setIsInviteMemberPopUpVisible] =
//     useState(false);
//   const handleMouseEnter = () => setIsHovered(true);
//   const handleMouseLeave = () => setIsHovered(false);
//   const teamSpaceRef = useRef(null);
//   const menuRef = useRef(null);
//   const tooltipId = "teamspace-tooltip";

//   // Check if any folder in the team contains the active item
//   useEffect(() => {
//     const isActiveInTeam = folderList.some((folder) =>
//       folder.documents.some((doc) => doc.doc_id === activeItem)
//     );
//     if (isActiveInTeam) setIsOpen(true);
//   }, [activeItem, folderList]);

//   const toggleOpen = () => {
//     if (folderList && folderList.length > 0) {
//       setIsOpen(!isOpen);
//     }
//   };

//   const handleCloseMenu = () => {
//     setShowDropdown(false);
//   };

//   const handleMenuClick = (e) => {
//     e.stopPropagation();
//     setShowDropdown((prevShowDropdown) => !prevShowDropdown);
//   };

//   const handleAddClick = (e) => {
//     e.stopPropagation();
//     onClickCreateFolder();
//   };

//   const handleOpenDeletePopup = () => {
//     setIsDeletePopupVisible(true);
//   };

//   const handleCloseDeletePopup = () => {
//     setIsDeletePopupVisible(false);
//   };
//   const handleOpenRenamePopUp = () => {
//     handleCloseMenu();
//     setIsRenameVisible(true);
//   };

//   const handleCloseRenamePopUp = () => {
//     setIsRenameVisible(false);
//   };

//   const handleOpenInvitePopUp = () => {
//     setIsInviteMemberPopUpVisible(true);
//   };

//   const handleCloseInvitePopUp = () => {
//     setIsInviteMemberPopUpVisible(false);
//   };

//   const dropdownOptions = [
//     {
//       label: "Invite Teammates",
//       icon: icons.inviteMemberIcon,
//       onClick: handleOpenInvitePopUp,
//     },
//     {
//       label: "Rename",
//       icon: icons.renameIcon,
//       onClick: handleOpenRenamePopUp,
//     },
//     {
//       label: "Delete",
//       icon: icons.trashIcon,
//       onClick: handleOpenDeletePopup,
//     },
//   ];

//   const currentIcon = isHovered
//     ? isOpen
//       ? icons.activeTeam
//       : icons.activeRightArrow
//     : icons.teamspaceIcon;
//   return (
//     <div>
//       {/*Kebab Menu*/}
//       {showDropdown && (
//         <DropdownMenu
//           referenceElement={menuRef.current}
//           exceptionRef={menuRef}
//           options={dropdownOptions}
//           onClose={handleCloseMenu}
//         />
//       )}
//       {/*Invite Members*/}
//       <InviteMemebersPopUp
//         isVisible={isInviteMemberPopupVisible}
//         onClick={handleCloseMenu} //TODO
//         onClose={handleCloseInvitePopUp}
//       />
//       {/*Delete Option*/}
//       <DeletePopUp
//         isVisible={isDeletePopupVisible}
//         title="Delete Teamspace"
//         buttonText="Delete"
//         subtitle="You will lost you all folder and documents"
//         desc="Are you sure to delete team permanently?"
//         onClick={() => {}}
//         onClose={handleCloseDeletePopup}
//       />
//       {/*Rename*/}
//       {isRenameVisible && (
//         <RenamePopUp
//           title={title}
//           referenceElement={teamSpaceRef.current}
//           onClose={handleCloseRenamePopUp}
//           exceptionRef={teamSpaceRef}
//         />
//       )}
//       <CustomTooltip id={tooltipId} />
//       <div
//         data-tooltip-id={tooltipId}
//         data-tooltip-content={title}
//         className="show-row-space-between"
//         onClick={toggleOpen}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="teamspace-header">
//           <img alt="icon" src={currentIcon} />
//           <span
//             ref={teamSpaceRef}
//             className={`folder-title ${isHovered ? "active" : ""}`}
//           >
//             {title}
//           </span>
//         </div>
//         <div style={{ display: "flex", flexDirection: "row" }}>
//           <img
//             className="hide-icon"
//             alt="menu"
//             ref={menuRef}
//             src={icons.activeMenuIcon}
//             onClick={handleMenuClick}
//           />
//           <img
//             alt="add"
//             className="hide-icon"
//             src={icons.activeAddIcon}
//             onClick={handleAddClick}
//           />
//         </div>
//       </div>
//       {isOpen && folderList && folderList.length > 0 && (
//         <div>
//           {folderList.map((e, index) => (
//             <Folder
//               key={index}
//               title={e.folder_name}
//               docList={e.documents}
//               onClickCreateDoc={onClickCreateDoc}
//               onClickDocument={onClickDocument}
//               activeItem={activeItem}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeamSpace;

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
    const isActiveInFolder = docList.some((doc) => doc.doc_id === activeItem);
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
  const currentIcon = isHovered
    ? isOpen
      ? icons.activeFolder
      : icons.activeRightArrow
    : icons.folderIcon;

  const handleAddDocClick = (e) => {
    e.stopPropagation();
    onClickCreateDoc();
  };
  const handleOpenDeletePopup = () => {
    handleCloseMenu();
    handleOpenFolderDeletePopup(folderId);
  };

  const handleUpdateRename = async () => {
    await apiService.renameFolder({ folderTitle }, folderId);
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
      icon: icons.renameIcon,
      onClick: handleOpenRenamePopUp,
    },
    {
      label: "Delete",
      icon: icons.trashIcon,
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
          <img alt="folder" src={currentIcon} />
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
        <img
          alt="add"
          src={icons.activeAddIcon}
          className="hide-icon"
          onClick={handleAddDocClick}
        />
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

export default Folder;

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
  const menuRef = useRef(null);
  const titleRef = useRef(null);
  const handleMouseEnter = () => {
    console.log(docId, activeItem, "is doc not active");
    if (activeItem === docId) {
      setIsActive(true);
    }
    setIsHovered(true);
  };
  useEffect(() => {
    setIsActive(activeItem === docId);
  }, [activeItem, docId]);

  const handleMouseLeave = () => {
    if (activeItem === docId) {
      console.log(isActive, "is active");
      setIsActive(true);
    }
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
    handleopendocumentdeletepopup();
  };

  const handleOpenRenamePopUp = () => {
    handleCloseMenu();
    setIsRenameVisible(true);
  };

  const handleCloseRenamePopUp = () => {
    setIsRenameVisible(false);
  };

  const dropdownOptions = [
    {
      label: "Rename",
      icon: icons.renameIcon,
      onClick: handleOpenRenamePopUp,
    },
    {
      label: "Delete",
      icon: icons.trashIcon,
      onClick: handleOpenDeletePopup,
    },
  ];
  const currentIcon =
    isHovered || isActive ? icons.activeDoc : icons.documentIcon;
  const tooltipId = "document-tooltip";
  useEffect(() => {
    console.log("inside folder", activeItem);
  }, [activeItem]);
  return (
    <div
      className={`show-row-space-between ${
        isHovered || isActive ? "active" : ""
      }`}
      onClick={() => onClickDocument(docId)}
      data-tooltip-id={tooltipId}
      data-tooltip-content={name}
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
          title={name}
          referenceElement={titleRef.current}
          onClose={handleCloseRenamePopUp}
          exceptionRef={titleRef}
        />
      )}

      <CustomTooltip id={tooltipId} place="right" />
      <div className="document-content">
        <img src={currentIcon} alt="doc" />
        <span
          ref={titleRef}
          className={`folder-title ${isHovered || isActive ? "active" : ""}`}
        >
          {name}
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
