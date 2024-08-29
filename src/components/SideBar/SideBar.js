import React, { useState } from "react";
import "./sidebar-style.css";
import SidebarItem from "./SideBarItems";
import TeamSpace from "./Folder";
import icons from "../../assets/icons";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import CreateFolderPopUp from "../PopUps/CreateFolderPopUp";
import DropdownMenu from "../PopUps/DropDown";

const projectList = [
  {
    team_name: "Teamspace A",
    folder_list: [
      {
        _id: "0",
        folder_name: "Product",
        documents: [
          { doc_id: "0", doc_name: "Insperations Management" },
          { doc_id: "1", doc_name: "Wireframe" },
        ],
      },
      {
        _id: "1",
        folder_name: "Design management",
        documents: [
          { doc_id: "0", doc_name: "Insperations" },
          { doc_id: "1", doc_name: "Wireframe" },
        ],
      },
    ],
  },
  {
    team_name: "Team B",
    folder_list: [
      {
        _id: "0",
        folder_name: "Product",
        documents: [
          { doc_id: "0", doc_name: "Insperations Management" },
          { doc_id: "1", doc_name: "Wireframe" },
        ],
      },
      {
        _id: "1",
        folder_name: "Design management",
        documents: [
          { doc_id: "0", doc_name: "Insperations" },
          { doc_id: "1", doc_name: "Wireframe" },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const [isCreateFolderPopupVisible, setIsCreateFolderPopupVisible] =
    useState(false);
  const [isCreateDocPopupVisible, setIsCreateDocPopupVisible] = useState(false);
  const [isCreateTeamSpacePopupVisible, setIsCreateTeamSpacePopupVisible] =
    useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleDropdownSelect = (option) => {
    console.log("Selected option:", option.label);
    setIsDropdownVisible(false);
  };
  const handleCreateFolderClick = () => {
    setIsCreateFolderPopupVisible(true);
  };

  const handleCloseFolderPopup = () => {
    setIsCreateFolderPopupVisible(false);
  };
  const handleCreateDocClick = () => {
    setIsCreateDocPopupVisible(true);
  };

  const handleCloseDocPopup = () => {
    setIsCreateDocPopupVisible(false);
  };
  const handleCreateTeamSpaceClick = () => {
    setIsCreateTeamSpacePopupVisible(true);
  };

  const handleCloseTeamSpacePopup = () => {
    setIsCreateTeamSpacePopupVisible(false);
  };
  const dropdownOptions = [
    { label: "Add Account", icon: icons.addAccountIcon },
    { label: "Logout", icon: icons.logOutIcon },
  ];
  return (
    <div className="sidebar">
      <div className="profile-section" onClick={toggleDropdown}>
        <div className="profile-section-row">
          <img alt="profile" src={icons.profileIcon} />
          <h2>userId</h2>
          <img alt="dropdown" src={icons.dropDownICon} />
        </div>
        {isDropdownVisible && (
          <DropdownMenu options={dropdownOptions} onSelect={handleDropdownSelect} />
        )}
        <img alt="close" src={icons.closeSideBarIcon} className="clickable" />
      </div>
      <SidebarItem
        title="All Requests"
        icon={icons.allRequestIcon}
        onClick={() => navigate("all-requests")}
      />
      <SidebarItem
        title="Create Folder"
        icon={icons.createFolderIcon}
        onClick={handleCreateFolderClick}
      />
      <div className="document-container">
        {projectList.map((e, index) => (
          <TeamSpace
            title={e.team_name}
            folderList={e.folder_list}
            onClickCreateTeam={handleCreateTeamSpaceClick}
            onClickCreateFolder={handleCreateFolderClick}
            onClickCreateDoc={handleCreateDocClick}
          />
        ))}
      </div>
      <SidebarItem title="Integration" icon={icons.intergrationIcon} />
      <SidebarItem title="Trash" icon={icons.trashIcon} />
      <SidebarItem title="Contact Us" icon={icons.contactUsIcon} />
      {/*TeamSpace Pop up*/}
      <CreateFolderPopUp
        title="Create Teamspace"
        subtitle="Teamspace will help to share documents"
        label="Teamspace Name"
        labelText="New Teamspace"
        buttonText="Create Teamspace"
        isVisible={isCreateTeamSpacePopupVisible}
        onClose={handleCloseTeamSpacePopup}
      />
      {/*Folder Pop up*/}
      <CreateFolderPopUp
        title="Create Folder"
        subtitle="Folders will keep your documents organised"
        label="Folder Name"
        labelText="New Folder"
        buttonText="Create Folder"
        isVisible={isCreateFolderPopupVisible}
        onClose={handleCloseFolderPopup}
      />
      {/*Document Pop up*/}
      <CreateFolderPopUp
        title="Create Document"
        subtitle="Document will keep your data organised"
        label="Document Name"
        labelText="New Document"
        buttonText="Create Document"
        isVisible={isCreateDocPopupVisible}
        onClose={handleCloseDocPopup}
      />
    </div>
  );
};

export default Sidebar;
