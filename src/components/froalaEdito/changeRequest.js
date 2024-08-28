import React from 'react';
import PropTypes from 'prop-types';
import '../../style.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
const ChangeRequest = ({ requester, date, time, message, aiEdits, onPrevious, onNext, onTap }) => {
  return (
    <div className="change-request-container">
      <div className="change-request-header">
        <p>  Change Request </p> <button className="close-button" onClick={onTap}>
          ✖
        </button>
      </div>
      <div className="change-request-body">
        <p>{message}</p>
      </div>
      <div className="change-request-details">
        <div className="change-request-requester"><span>{requester}</span>
          <span>|</span>
          <span>{date} {time}</span></div>
        <div className="change-request-footer">
          <button className="change-request-prev" onClick={onPrevious}>
            <IoIosArrowBack />
          </button>
          <span> {aiEdits}    AI Edits </span>
          <button className="change-request-next" onClick={onNext}> <IoIosArrowForward /></button>
        </div>
      </div>
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
  onTap: PropTypes.func.isRequired
};

export default ChangeRequest;