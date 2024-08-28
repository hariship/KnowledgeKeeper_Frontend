import React from 'react';
import '../../style.css';

const SuggestionCardComponent = ({ num, title, content, onTapAccept, onTapReject, isActive, onCoverTap }) => {
    return (
        <div 
            className={`suggestion-container ${isActive ? 'active' : ''}`}
            onClick={onCoverTap} // Make the entire card clickable
        >
            <div className="suggestion-header">
                <span className="suggestion-num">{num}</span>
                <span className="suggestion-title">{title}</span>
            </div>
            <div className="suggestion-content">
                <p>{content}</p>
            </div>
            {isActive && (
                <div className="suggestion-actions">
                    <button className="accept-button" onClick={(e) => { e.stopPropagation(); onTapAccept(); }}>
                        ✓ Accept
                    </button>
                    <button className="reject-button" onClick={(e) => { e.stopPropagation(); onTapReject(); }}>
                        ✗ Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default SuggestionCardComponent;
