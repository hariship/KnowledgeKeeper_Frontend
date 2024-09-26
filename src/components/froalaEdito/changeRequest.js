import React, { useEffect, useRef, useState } from 'react';
import PropTypes from "prop-types";
import "../../style.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import icons from "../../assets/icons";
import SvgResolveIcon from "../../icons/ResolveIcon";
const ChangeRequest = ({
  requester,
  date,
  time,
  message,
  aiEdits,
  onPrevious,
  onNext,
  onTap,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const changeRequestRef = useRef(null);
  const redContainerRef = useRef(null);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const updateHeight = () => {
    if (changeRequestRef.current) {
      const changeRect = changeRequestRef.current.getBoundingClientRect();
      if (redContainerRef.current) {
        redContainerRef.current.style.height = `${changeRect.height}px`; // Sync the height of the red container
      }
    }
  };

  useEffect(() => {
    updateHeight(); 

    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    updateHeight();
  }, [isExpanded]);
  const shouldShowReadMore = message.length > 100;

  return (
    <div>
    <div className="change-request-container" ref={changeRequestRef}>
      <div className="change-request-header">
        Change Request
        <img
          className="close-button"
          src={icons.activeCloseIcon}
          alt="close"
          onClick={onTap}
        />
      </div>
      <div
        className={`change-request-body ${
          isExpanded ? "expanded" : "collapsed"
        }`}
      >
        {shouldShowReadMore
          ? !isExpanded
            ? `${message.slice(0, 90)}...  `
            : message
          : message}
        {shouldShowReadMore && (
          <span className="read-more-toggle" onClick={handleToggle}>
            {isExpanded ? (
              <span className="spacing">See less</span>
            ) : (
              "Read more"
            )}
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
            <span>
              {date} {time}
            </span>
          </div>
        </div>
        <div className="change-request-footer">
          <button className="change-request-prev" onClick={onPrevious}>
            <IoIosArrowBack />
          </button>
          <span> {aiEdits} AI Edits </span>
          <button className="change-request-next" onClick={onNext}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
    <div ref={redContainerRef}></div></div>
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
