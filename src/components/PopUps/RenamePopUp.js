import React, { useRef, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import "./popup-style.css";

const RenamePopUp = ({
  referenceElement,
  title,
  onClose,
  setTitle,
  exceptionRef,
}) => {
  const renameRef = useRef(null);
  const dropdownRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const [inputValue, setInputValue] = useState(title);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 6],
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

  useEffect(() => {
    if (renameRef.current) {
      renameRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onClose();
    }
  };

  if (!referenceElement) return null;

  return (
    <div
      ref={(node) => {
        setPopperElement(node);
        dropdownRef.current = node;
      }}
      style={{ ...styles.popper, position: "fixed" }}
      className="rename-popup"
      {...attributes.popper}
    >
      <input
        ref={renameRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="rename-text"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default RenamePopUp;
