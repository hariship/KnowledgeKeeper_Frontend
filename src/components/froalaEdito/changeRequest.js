import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./editor-style.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import icons from "../../assets/icons";
import SvgResolveIcon from "../../icons/ResolveIcon";

const ChangeRequest = ({
  width = 500,  
  requester = "Missing element", 
  date = "N/A", 
  time = "N/A",  
  message = "No message available",  
  aiEdits = "0",  
  onPrevious = () => {},  
  onNext = () => {},  
  onTap = () => {},  
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shortMessage, setShortMessage] = useState(message);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);
  const changeRequestRef = useRef(null);
  const redContainerRef = useRef(null);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const updateHeight = () => {
    if (changeRequestRef.current) {
      const changeRect = changeRequestRef.current.getBoundingClientRect();
      if (redContainerRef.current) {
        redContainerRef.current.style.height = `${changeRect.height}px`;
      }
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [width, isExpanded]);

  const getVisibleCharacters = (msg, containerWidth) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = "16px Arial"; 

    let textWidth = context.measureText(msg).width;
    let visibleChars = msg;
    if (textWidth > containerWidth) {
      let ellipsis = '...';
      let maxWidth = containerWidth - context.measureText(ellipsis).width;
      let currentWidth = 0;

      for (let i = 0; i < msg.length; i++) {
        let charWidth = context.measureText(msg[i]).width;
        if (currentWidth + charWidth > maxWidth) {
          visibleChars = msg.substring(0, i) + ellipsis;
          break;
        }
        currentWidth += charWidth;
      }
    }
    return visibleChars;
  };

  useEffect(() => {
    const visibleMessage = getVisibleCharacters(message, width);
    setShortMessage(visibleMessage);
    setShouldShowReadMore(visibleMessage !== message);
  }, [message, width]);

  return (
    <div>
      <div className="change-request-container" ref={changeRequestRef} style={{ width: `${width}px` }}>
        <div className="change-request-header">
          Change Request
          <img className="close-button" src={icons.activeCloseIcon} alt="close" onClick={onTap} />
        </div>
        <div className={`change-request-body ${isExpanded ? "expanded" : "collapsed"}`}>
          {isExpanded ? message : shortMessage}
          {shouldShowReadMore && (
            <span className="read-more-toggle" onClick={handleToggle}>
              {isExpanded ? "See less" : "Read more"}
            </span>
          )}
        </div>
        <div className="change-request-details">
          <div>
            <div className="resolve-option">
              Resolve
              <SvgResolveIcon className="resolve-icon" />
            </div>
            <div className="change-request-requester">
              <span>{requester}</span>
              <span>|</span>
              <span>{date} {time}</span>
            </div>
          </div>
          <div className="change-request-footer">
            <button className="change-request-prev" onClick={onPrevious}>
              <IoIosArrowBack />
            </button>
            <span>{aiEdits} AI Edits</span>
            <button className="change-request-next" onClick={onNext}>
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div ref={redContainerRef}></div>
    </div>
  );
};

ChangeRequest.propTypes = {
  requester: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  aiEdits: PropTypes.string.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onTap: PropTypes.func.isRequired,
};

export default ChangeRequest;