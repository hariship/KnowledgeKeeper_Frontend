import React, { useEffect, useRef, useState } from "react";
import "./editor-style.css";
import SvgCloseCross from "../../icons/CloseCross";
import SvgDoneCheck from "../../icons/DoneCheck";

const SuggestionCardComponent = ({
  num,
  recommendationData,
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
  const {
    section_main_heading1,
    section_main_heading2,
    section_main_heading3,
    section_main_heading4,
    change_request_text,
  } = recommendationData;

  let filteredContent = change_request_text;
  
  const removeHeadingAndElement = (content, heading) => {
    if (!heading) return content; 
    const regex = new RegExp(`<h[1-6][^>]*>[^<]*${heading}[^<]*<\\/h[1-6]>`, "gi");
    return content.replace(regex, "");
  };
    filteredContent = removeHeadingAndElement(
    filteredContent,
    section_main_heading1
  );
  filteredContent = removeHeadingAndElement(
    filteredContent,
    section_main_heading2
  );
  filteredContent = removeHeadingAndElement(
    filteredContent,
    section_main_heading3
  );
  filteredContent = removeHeadingAndElement(
    filteredContent,
    section_main_heading4
  );
  return (
    <div
      className={`suggestion-container ${isActive ? "active" : ""}`}
      onClick={onCoverTap}
    >
      <div className="suggestion-header">
        <span className="suggestion-num">{num}</span>
        <span className="suggestion-title">
          {recommendationData.change_request_type}
        </span>
      </div>
      <div
        className={`suggestion-content ${isActive ? "active" : ""}`}
        ref={contentRef}
      >
        <div dangerouslySetInnerHTML={{ __html: filteredContent }} />
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
