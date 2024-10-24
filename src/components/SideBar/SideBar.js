import React, { useState, useRef, useEffect } from "react";
import "./sidebar-style.css";
import SidebarItem from "./SideBarItems";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import CreateFolderPopUp from "../PopUps/CreateFolderPopUp";
import DropdownMenu from "../PopUps/DropDown";
import DeletePopUp from "../PopUps/DeletePopUp";
import CustomTooltip from "../PopUps/CustomToolTip";
import SvgOpenSidebar from "../../icons/OpenSidebar";
import { apiService } from "../../services/apiService";
import InviteMemebersPopUp from "../PopUps/InviteMembersPopUp";
import SvgKkLogo from "../../icons/KkLogo";
import SvgAddIcon from "../../icons/AddIcon";
import SvgIntergration from "../../icons/Intergration";
import SvgTrash from "../../icons/Trash";
import SvgContactUs from "../../icons/ContactUs";
import SvgAllRequest from "../../icons/AllRequest";
import SvgProfile from "../../icons/Profile";
import SvgDropdown from "../../icons/Dropdown";
import SvgCloseSidebar from "../../icons/CloseSidebar";
import SvgLogOut from "../../icons/LogOut";
import TeamSpace from "./Folder";

const Sidebar = ({ activeItem, isTeamspaceOpen, setIsTeamspaceOpen }) => {
  const [isCreateFolderPopupVisible, setIsCreateFolderPopupVisible] =
    useState(false);
  const [isCreateDocPopupVisible, setIsCreateDocPopupVisible] = useState(false);
  const [isCreateTeamSpacePopupVisible, setIsCreateTeamSpacePopupVisible] =
    useState(false);
  const [isDeleteTeamSpacePopupVisible, setIsDeleteTeamSpacePopupVisible] =
    useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const [isLogoutPopupVisible, setisLogoutPopVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const profileSectionRef = useRef(null);
  const documentContainerRef = useRef(null);
  const tooltipId = "profile-tooltip";
  const [isFolderDeletePopupVisible, setIsFolderDeletePopupVisible] =
    useState(false);
  const [isDocDeletePopupVisible, setIsDocDeletePopupVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isInviteMemberPopupVisible, setIsInviteMemberPopUpVisible] =
    useState(false);
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    getClientDetails();
  }, []);

  //Get User Data : Teamspace
  const getClientDetails = async () => {
    const data = await apiService.getUserTeamSpace();
    setProjectList([]);
    setProjectList(data);
    console.log("navigation activeItem", activeItem);
  };

  //Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleOpen = () => {
    if (projectList && projectList.length > 0) {
      setIsTeamspaceOpen(!isTeamspaceOpen);
    }
  };

  //Logout
  const handleOpenLogoutPopUp = () => {
    setisLogoutPopVisible(true);
  };
  const handleCloseLogoutPopUp = () => {
    setisLogoutPopVisible(false);
  };

  //Toggle Dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  //Invite Members
  const handleOpenInvitePopUp = () => {
    setIsInviteMemberPopUpVisible(true);
  };
  const handleCloseInvitePopUp = () => {
    setIsInviteMemberPopUpVisible(false);
  };

  //CREATE Teamspace
  const handleCreateTeamspaceClick = (e) => {
    e.stopPropagation();
    setIsCreateTeamSpacePopupVisible(true);
  };
  const handleCreateTeamspace = async (teamspaceName) => {
    await apiService.createTeamspace(teamspaceName);
    await getClientDetails();
    handleCloseTeamspacePopup();
  };
  const handleCloseTeamspacePopup = () => {
    setIsCreateTeamSpacePopupVisible(false);
  };

  //Create Folder
  const handleCreateFolderClick = (teamspaceId) => {
    setSelectedId(teamspaceId);
    setIsCreateFolderPopupVisible(true);
  };
  const handleCreateFolder = async (folderName) => {
    await apiService.createFolder(folderName, selectedId);
    await getClientDetails();
    handleCloseFolderPopup();
  };
  const handleCloseFolderPopup = () => {
    setIsCreateFolderPopupVisible(false);
  };

  //Create Document
  const handleCreateDocument = async (folderId, documentName) => {
    await apiService.createDocument(documentName, folderId);
    await getClientDetails();
    handleCloseDocPopup();
  };
  const handleCreateDocClick = (folderId) => {
    setSelectedId(folderId);
    setIsCreateDocPopupVisible(true);
  };
  const handleCloseDocPopup = () => {
    setIsCreateDocPopupVisible(false);
  };
  const handleDocumentClick = (id) => {
    navigate(`document/${id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (window.innerWidth >= 768 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  const dropdownOptions = [
    {
      label: "Logout",
      icon: SvgLogOut,
      onClick: handleOpenLogoutPopUp,
    },
  ];
  const handleOpenTeamspaceDeletePopup = (teamspaceId) => {
    setSelectedId(teamspaceId);
    setIsDeleteTeamSpacePopupVisible(true);
  };

  const handleDeleteTeamspace = async () => {
    await apiService.deleteTeamspace(selectedId);
    await getClientDetails();
    handleCloseTeamspaceDeletePopup();
  };
  const handleCloseTeamspaceDeletePopup = () => {
    setIsDeleteTeamSpacePopupVisible(false);
  };

  const handleOpenFolderDeletePopup = (folderId) => {
    setSelectedId(folderId);
    setIsFolderDeletePopupVisible(true);
  };
  const handleDeleteFolder = async () => {
    await apiService.deleteFolder(selectedId);
    await getClientDetails();
    handleCloseFolderDeletePopup();
  };
  const handleCloseFolderDeletePopup = () => {
    setIsFolderDeletePopupVisible(false);
  };

  const handleOpenDocDeletePopup = (docId) => {
    setSelectedId(docId);
    setIsDocDeletePopupVisible(true);
  };

  const handleCloseDocDeletePopup = () => {
    setIsDocDeletePopupVisible(false);
  };

  const handleDeleteDoc = async () => {
    await apiService.deleteDocument(selectedId);
    await getClientDetails();
    handleCloseDocDeletePopup();
  };
  return (
    <div className="sidebar-class">
      <SvgKkLogo
        className="logo"
        onClick={() => {
          navigate("all-requests");
        }}
      />
      {isSidebarOpen ? (
        <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="show-row-space-between">
            <div
              className="profile-section-row"
              data-tooltip-id={tooltipId}
              data-tooltip-content={sessionStorage.getItem("email")}
              ref={profileSectionRef}
              onClick={toggleDropdown}
            >
              <SvgProfile className="default-img-icon" />
              <h2>{sessionStorage.getItem("email")}</h2>
              <SvgDropdown className="default-img-icon" />
            </div>
            {isDropdownVisible && (
              <DropdownMenu
                placement="bottom-start"
                options={dropdownOptions}
                onClose={toggleDropdown}
                referenceElement={profileSectionRef.current}
                exceptionRef={profileSectionRef}
              />
            )}
            <CustomTooltip id={tooltipId} />
            <SvgCloseSidebar
              className="default-img-icon"
              onClick={toggleSidebar}
            />
          </div>
          <div style={{ height: "8px" }}></div>
          <SidebarItem
            title="All Requests"
            icon={SvgAllRequest}
            isActive={activeItem === "All Requests"}
            onClick={() => {
              navigate("all-requests");
            }}
          />

          <div style={{ height: "8px" }}></div>
          <div className="show-row-space-between" onClick={toggleOpen}>
            <div
              className={`team-header ${
                activeItem === "Teamspace" ? "active" : ""
              }`}
            >
              Teamspace
            </div>
            <SvgAddIcon
              className="hide-icon"
              onClick={handleCreateTeamspaceClick}
            />
          </div>
          <div className="document-container" ref={documentContainerRef}>
            {isTeamspaceOpen && projectList && projectList.length > 0 && (
              <div>
                {projectList.map((e, index) => (
                  <TeamSpace
                    key={index}
                    teamspaceId={e.id}
                    title={e.teamspaceName}
                    folderList={e.folder}
                    onClickCreateFolder={() => {
                      handleCreateFolderClick(e.id);
                    }}
                    handleOpenInvitePopUp={handleOpenInvitePopUp}
                    onClickCreateDoc={handleCreateDocClick}
                    onClickDocument={handleDocumentClick}
                    handleOpenFolderDeletePopup={handleOpenFolderDeletePopup}
                    handleopendocumentdeletepopup={handleOpenDocDeletePopup}
                    handleOpenDeleteTeamspacePopup={() => {
                      handleOpenTeamspaceDeletePopup(e.id);
                    }}
                    activeItem={activeItem}
                  />
                ))}
              </div>
            )}
          </div>
          <SidebarItem
            title="Integration"
            icon={SvgIntergration}
            isActive={activeItem === "Integration"}
            onClick={() => {
              navigate("integration");
            }}
          />
          <SidebarItem
            title="Trash"
            icon={SvgTrash}
            isActive={activeItem === "Trash"}
            onClick={() => {
              navigate("trash");
            }}
          />
          <SidebarItem
            title="Feedback"
            icon={SvgContactUs}
            isActive={activeItem === "Feedback"}
            onClick={() => {
              window.open(
                "https://knowledgekeeper.canny.io/user-feedback",
                "_blank"
              );
            }}
          />
        </div>
      ) : (
        <button className="sidebar-button" onClick={toggleSidebar}>
          <SvgOpenSidebar className="sidebar-icon" />
        </button>
      )}
      ;{/*Invite Members*/}
      <InviteMemebersPopUp
        isVisible={isInviteMemberPopupVisible}
        teamspaceId={selectedId}
        onClose={handleCloseInvitePopUp}
      />
      {/*TeamSpace Pop up*/}
      <CreateFolderPopUp
        selectedId={selectedId}
        title="New teamspace"
        subtitle="Teamspaces are where your team organizes pages, permissions, and members"
        label="Name of your teamspace"
        labelText="Enter Name"
        buttonText="Create Teamspace"
        isVisible={isCreateTeamSpacePopupVisible}
        onClick={handleCreateTeamspace}
        onClose={handleCloseTeamspacePopup}
      />
      {/*Folder Pop up*/}
      <CreateFolderPopUp
        selectedId={selectedId}
        title="Create Folder"
        subtitle="Folders will keep your documents organised"
        label="Folder Name"
        labelText="New Folder"
        buttonText="Create Folder"
        isVisible={isCreateFolderPopupVisible}
        onClose={handleCloseFolderPopup}
        onClick={handleCreateFolder}
      />
      {/*Document Pop up*/}
      <CreateFolderPopUp
        selectedId={selectedId}
        title="Create Document"
        subtitle="Document will keep your data organised"
        label="Document Name"
        labelText="New Document"
        buttonText="Create Document"
        isVisible={isCreateDocPopupVisible}
        onClose={handleCloseDocPopup}
        onClick={(e) => handleCreateDocument(selectedId, e)}
      />
      {/*Delete Teamspace*/}
      <DeletePopUp
        isVisible={isDeleteTeamSpacePopupVisible}
        title="Delete Teamspace"
        buttonText="Delete"
        subtitle="You will lost you all folder and documents"
        desc="Are you sure to delete team permanently?"
        onClick={handleDeleteTeamspace}
        onClose={handleCloseTeamspaceDeletePopup}
      />
      {/*Delete Folder*/}
      <DeletePopUp
        isVisible={isFolderDeletePopupVisible}
        title="Delete Folder"
        buttonText="Delete"
        subtitle="You will lost your all documents"
        desc="Are you sure to delete folder permanently?"
        onClick={handleDeleteFolder}
        onClose={handleCloseFolderDeletePopup}
      />
      {/*Delete Document*/}
      <DeletePopUp
        isVisible={isDocDeletePopupVisible}
        title="Delete Document"
        buttonText="Delete"
        subtitle="You will lost your all data"
        desc="Are you sure to delete document permanently?"
        onClick={handleDeleteDoc}
        onClose={handleCloseDocDeletePopup}
      />
      {/*Log Out*/}
      <DeletePopUp
        isVisible={isLogoutPopupVisible}
        title="Log out"
        buttonText="Log out"
        subtitle="You have to relogin to your account."
        desc="Are you sure to log out?"
        onClick={() => {
          navigate("/");
          apiService.logout();
        }}
        onClose={handleCloseLogoutPopUp}
      />
    </div>
  );
};

export default Sidebar;
