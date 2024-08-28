import React, { useState } from 'react';
import './sidebar-style.css';
import SidebarItem from './SideBarItems';
import Folder from './Folder';
import icons from '../../assets/icons';
import '../../style.css';
import { useNavigate } from 'react-router-dom';
import CreateFolderPopUp from '../PopUps/CreateFolderPopUp';

const projectList = [
    {
        _id: "0",
        folder_name: "Product management",
        documents: [
            { doc_id: "0", doc_name: "Insperations" },
            { doc_id: "1", doc_name: "Wireframe" }
        ]
    },
    {
        _id: "1",
        folder_name: "Design management",
        documents: [
            { doc_id: "0", doc_name: "Insperations" },
            { doc_id: "1", doc_name: "Wireframe" }
        ]
    }
];

const Sidebar = () => {
    const [isCreateFolderPopupVisible, setIsCreateFolderPopupVisible] = useState(false);
    const navigate = useNavigate();

    const handleCreateFolderClick = () => {
        setIsCreateFolderPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsCreateFolderPopupVisible(false);
    };

    return (
        <div className="sidebar">
            <div className='profile-section'>
                <div className='profile-section-row'>
                    <img alt='profile' src={icons.profileIcon} />
                    <h2>userId</h2>
                    <img alt='dropdown' src={icons.dropDownICon} />
                </div>
                <img alt='close' src={icons.closeSideBarIcon} className='clickable' />
            </div>
            <SidebarItem title="All Requests" icon={icons.allRequestIcon} onClick={() => navigate('all-requests')} />
            <SidebarItem title="Create Folder" icon={icons.createFolderIcon} onClick={handleCreateFolderClick} />
            <div className='document-container'>
                {projectList.map((e, index) => (
                    <Folder key={index} title={e.folder_name} docList={e.documents} />
                ))}
            </div>
            <SidebarItem title="Integration" icon={icons.intergrationIcon} />
            <SidebarItem title="Trash" icon={icons.trashIcon} />
            <SidebarItem title="Contact Us" icon={icons.contactUsIcon} />
            <CreateFolderPopUp isVisible={isCreateFolderPopupVisible} onClose={handleClosePopup} />
        </div>
    );
};

export default Sidebar;
