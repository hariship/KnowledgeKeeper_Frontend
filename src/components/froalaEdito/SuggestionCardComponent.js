import React, { useEffect, useRef, useState } from "react";
import "./editor-style.css";
import SvgCloseCross from "../../icons/CloseCross";
import SvgDoneCheck from "../../icons/DoneCheck";

const SuggestionCardComponent = ({
  num,
  title,
  content,
  onTapAccept,
  onTapReject,
  isRecommendationAccepted,
  isRecommendationRejected,
  isActive,
  onCoverTap,
}) => {
  const contentRef = useRef(null);
  useEffect(() => {
    if (!isActive && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isActive]);

  const [isAccepted, setIsAccepted] = useState(isRecommendationAccepted);
  const [isRejected, setIsRejected] = useState(isRecommendationRejected);

  return (
    <div
      className={`suggestion-container ${isActive ? "active" : ""}`}
      onClick={onCoverTap}
    >
      <div className="suggestion-header">
        <span className="suggestion-num">{num}</span>
        <span className="suggestion-title">{title}</span>
      </div>
      <div
        className={`suggestion-content ${isActive ? "active" : ""}`}
        ref={contentRef}
      >
        <p>{content}</p>
      </div>
      {isActive &&
        (!isAccepted && !isRejected ? (
          <div className="suggestion-actions">
            <button
              className="accept-button"
              onClick={(e) => {
                e.stopPropagation();
                onTapAccept();
                setIsAccepted(true);
              }}
            >
              <SvgDoneCheck className="white-icon" /> Accept
            </button>
            <button
              className="reject-button"
              onClick={(e) => {
                e.stopPropagation();
                onTapReject();
                setIsRejected(true);
              }}
            >
              <SvgCloseCross className="grey-icon" /> Reject
            </button>
          </div>
        ) : (
          <div>
            {isAccepted && (
              <button className="final-button">
                <SvgDoneCheck className="final-icon" /> Accepted
              </button>
            )}
            {isRejected && (
              <button className="final-button">
                <SvgCloseCross className="final-icon" /> Rejected
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default SuggestionCardComponent;
