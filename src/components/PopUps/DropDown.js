import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "./popup-style.css";

const DropdownMenu = ({ referenceElement, options, onClose, exceptionRef, placement = 'right-start' }) => {
  const dropdownRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,  
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 3], 
        },
      },
    ],
  });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        exceptionRef.current &&
        !exceptionRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, exceptionRef]);

  return (
    <div
      ref={(node) => {
        setPopperElement(node);
        dropdownRef.current = node;
      }}
      style={{ ...styles.popper, position: 'fixed' }}  
      className="dropdown-menu"
      {...attributes.popper}
    >
      {options.map((option, index) => (
        <div className="dropdown-item" key={index} onClick={(e) => {
          e.stopPropagation(); 
          option.onClick(e); 
        }}>
          
          <img src={option.icon} alt={option.label} className="dropdown-icon" />
          <span>{option.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
