import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import './popup-style.css'; 

const CustomTooltip = ({ id, place = "top", effect = "solid", ...props }) => {
  return (
    <ReactTooltip 
      id={id} 
      place={place} 
      effect={effect} 
      followCursor={true} 
      backgroundColor="#333" 
      className="custom-tooltip" 
      {...props}
    />
  );
};

export default CustomTooltip;
