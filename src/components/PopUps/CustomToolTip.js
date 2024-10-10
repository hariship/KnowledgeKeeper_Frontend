import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import './popup-style.css'; 

const CustomTooltip = ({ id, content, place = "bottom-right", effect = "solid", ...props }) => {
  return (
    <ReactTooltip
      id={id}
      place={place}
      effect={effect}
      followCursor={true}
      delayShow={450}  
      delayHide={50} 
      textColor="#fff" 
      border={false}  
      arrowColor="transparent"  
      className="custom-tooltip no-arrow" 
      {...props}
    >
      {content}
    </ReactTooltip>
  );
};

export default CustomTooltip;
