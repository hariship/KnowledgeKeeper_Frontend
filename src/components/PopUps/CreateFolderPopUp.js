import React from 'react';
import './popup-style.css';
import icons from '../../assets/icons';
import HeaderSubHeadingComponent from './CustomComponets';

const CreateFolderPopUp = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>

                <div className='show-row-space-between'>
                    <HeaderSubHeadingComponent />
                    <img alt='close' src={icons.closeIcon} /></div>
                <button className='popup-button'>Create Folder</button>

            </div>
        </div>
    );
};

export default CreateFolderPopUp;
