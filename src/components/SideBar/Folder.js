import React, { useState } from 'react';
import '../../style.css';
import './sidebar-style.css';
import icons from '../../assets/icons';

const Folder = ({ title, docList }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (docList && docList.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="folder">
      <div onClick={toggleOpen} className="folder-header">
        <img alt="folder" src={icons.folderIcon} />
        <span>{title}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      {isOpen && docList && docList.length > 0 && (
        <div className="folder-contents">
          {docList.map((e, index) => (
            <div className='document-content' key={index}>
              <img src={icons.documentIcon} alt="doc" />
              <span>{e.doc_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
