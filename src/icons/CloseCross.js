import * as React from "react";
const SvgCloseCross = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 19" 
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 6 6 18M6 6l12 12"
    />
  </svg>
);
export default SvgCloseCross;
