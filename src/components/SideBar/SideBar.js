import React, { useState, useRef, useEffect } from "react";
import "./sidebar-style.css";
import SidebarItem from "./SideBarItems";
import icons from "../../assets/icons";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import CreateFolderPopUp from "../PopUps/CreateFolderPopUp";
import DropdownMenu from "../PopUps/DropDown";
import DeletePopUp from "../PopUps/DeletePopUp";
import CustomTooltip from "../PopUps/CustomToolTip";
import SvgOpenSidebar from "../../icons/OpenSidebar";
import { apiService } from "../../services/apiService";
import Folder from "./Folder";
import SvgKkLogo from "../../icons/KkLogo";

// const userDetail = {
//   name: "UserId256153712372637123642786",
// };
// const projectList = [
//   {
//     // team_name: "Teamspace Amazon AmazonAmazon",
//     // folder_list: [
//     //   {
//     _id: "0",
//     folder_name: "Product",
//     documents: [
//       {
//         doc_id: "0",
//         doc_name: "Insperations ManagementInsperations Management",
//       },
//       { doc_id: "1", doc_name: "Wireframe" },
//     ],
//   },
//   {
//     _id: "1",
//     folder_name: "Design management",
//     documents: [
//       { doc_id: "2", doc_name: "Insperations" },
//       { doc_id: "3", doc_name: "Wireframe" },
//     ],
//   },
//   {
//     _id: "2",
//     folder_name: "Design management",
//     documents: [
//       { doc_id: "4", doc_name: "Insperations" },
//       { doc_id: "5", doc_name: "Wireframe" },
//     ],
//   },
//   {
//     _id: "3",
//     folder_name: "Design management",
//     documents: [
//       { doc_id: "6", doc_name: "Insperations" },
//       { doc_id: "7", doc_name: "Wireframe" },
//     ],
//   },
//   //   ],
//   // },
//   {
//     // team_name: "Team B",
//     // folder_list: [
//     //   {
//     _id: "4",
//     folder_name: "Product",
//     documents: [
//       { doc_id: "8", doc_name: "Insperations Management" },
//       { doc_id: "9", doc_name: "Wireframe" },
//     ],
//   },
//   {
//     _id: "5",
//     folder_name: "Design management",
//     documents: [
//       { doc_id: "10", doc_name: "Insperations" },
//       { doc_id: "11", doc_name: "Wireframe" },
//     ],
//   },
//   //   ],
//   // },
// ];

const Sidebar = ({ activeItem, isTeamspaceOpen, setIsTeamspaceOpen }) => {
  const [isCreateFolderPopupVisible, setIsCreateFolderPopupVisible] =
    useState(false);
  const [isCreateDocPopupVisible, setIsCreateDocPopupVisible] = useState(false);
  // const [isCreateTeamSpacePopupVisible, setIsCreateTeamSpacePopupVisible] =
  //   useState(false);
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
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getClientDetails();
  }, [isDocDeletePopupVisible,isCreateFolderPopupVisible]);

  const getClientDetails = async () => {
    try {
      // setLoading(true);
      const data = await apiService.getUserTeamSpace();
      setProjectList(data);
      console.log("navigation data",data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleOpen = () => {
    if (projectList && projectList.length > 0) {
      setIsTeamspaceOpen(!isTeamspaceOpen);
    }
  };

  const handleOpenLogoutPopUp = () => {
    setisLogoutPopVisible(true);
  };
  const handleCloseLogoutPopUp = () => {
    setisLogoutPopVisible(false);
  };
  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  //CREATE
  const handleCreateFolderClick = (e) => {
    e.stopPropagation();
    setIsCreateFolderPopupVisible(true);
  };

  const handleCreateFolder = async (folderName) => {
    await apiService.createFolder(folderName);
    handleCloseFolderPopup();
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
  // const handleCreateTeamSpaceClick = (e) => {
  //   e.stopPropagation();
  //   setIsCreateTeamSpacePopupVisible(true);
  // };

  // const handleCloseTeamSpacePopup = () => {
  //   setIsCreateTeamSpacePopupVisible(false);
  // };

  const handleDocumentClick = (id) => {
    navigate(`document-edit/${id}`);
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
      icon: icons.logOutIcon,
      onClick: handleOpenLogoutPopUp,
    },
  ];
  const handleOpenFolderDeletePopup = (folderId) => {
    setSelectedFolderId(folderId);
    setIsFolderDeletePopupVisible(true);
  };

  const handleDeleteFolder = async () => {
    await apiService.deleteFolder(selectedFolderId);
    handleCloseDocDeletePopup();
  };
  const handleCloseFolderDeletePopup = () => {
    setIsFolderDeletePopupVisible(false);
  };

  const handleOpenDocDeletePopup = (e) => {
    setIsDocDeletePopupVisible(true);
  };

  const handleCloseDocDeletePopup = () => {
    setIsDocDeletePopupVisible(false);
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
              <img alt="profile" src={icons.profileIcon} />
              <h2>{sessionStorage.getItem("email")}</h2>
              <img alt="dropdown" src={icons.dropDownICon} />
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
            <img
              alt="close"
              src={icons.closeSideBarIcon}
              className="toggle-sidebar"
              onClick={toggleSidebar}
            />
          </div>
          <div style={{ height: "8px" }}></div>
          <SidebarItem
            title="All Requests"
            icon={icons.allRequestIcon}
            activeIcon={icons.activeAllRequestIcon}
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
            <img
              alt="add"
              className="hide-icon"
              src={icons.activeAddIcon}
              onClick={handleCreateFolderClick}
            />
          </div>
          <div className="document-container" ref={documentContainerRef}>
            {isTeamspaceOpen && projectList && projectList.length > 0 && (
              <div>
                {projectList.map((e, index) => (
                  // <TeamSpace
                  // key={index}
                  //   title={e.team_name}
                  //   folderList={e.folder_list}
                  //   onClickCreateFolder={handleCreateFolderClick}
                  //   onClickCreateDoc={handleCreateDocClick}
                  //   onClickDocument={handleDocumentClick}
                  //   activeItem={activeItem}
                  // />
                  <Folder
                    key={index}
                    folderId={e.id}
                    title={e.folderName}
                    docList={e.documents}
                    onClickCreateDoc={handleCreateDocClick}
                    onClickDocument={handleDocumentClick}
                    handleOpenFolderDeletePopup={handleOpenFolderDeletePopup}
                    handleopendocumentdeletepopup={handleOpenDocDeletePopup}
                    activeItem={activeItem}
                  />
                ))}
              </div>
            )}
          </div>
          <SidebarItem
            title="Integration"
            icon={icons.intergrationIcon}
            activeIcon={icons.activeIntegration}
            isActive={activeItem === "Integration"}
            onClick={() => {
              navigate("integration");
            }}
          />
          <SidebarItem
            title="Trash"
            icon={icons.trashIcon}
            activeIcon={icons.activeTrash}
            isActive={activeItem === "Trash"}
            onClick={() => {
              navigate("trash");
            }}
          />
          <SidebarItem
            title="Feedback"
            icon={icons.contactUsIcon}
            activeIcon={icons.activeContactUs}
            isActive={activeItem === "Feedback"}
            onClick={() => {
              navigate("feedback");
            }}
          />
        </div>
      ) : (
        <button className="sidebar-button" onClick={toggleSidebar}>
          <SvgOpenSidebar className="sidebar-icon" />
        </button>
      )}
      ;{/*TeamSpace Pop up*/}
      {/* <CreateFolderPopUp
        title="New teamspace"
        subtitle="Teamspaces are where your team organizes pages, permissions, and members"
        label="Name of your teamspace"
        labelText="Enter Name"
        buttonText="Create Teamspace"
        isVisible={isCreateTeamSpacePopupVisible}
        onClose={handleCloseTeamSpacePopup}
      /> */}
      {/*Folder Pop up*/}
      <CreateFolderPopUp
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
        title="Create Document"
        subtitle="Document will keep your data organised"
        label="Document Name"
        labelText="New Document"
        buttonText="Create Document"
        isVisible={isCreateDocPopupVisible}
        onClose={handleCloseDocPopup}
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
        onClick={() => {}}
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
          apiService.logout();
          navigate("/");
        }}
        onClose={handleCloseLogoutPopUp}
      />
    </div>
  );
};

export default Sidebar;
