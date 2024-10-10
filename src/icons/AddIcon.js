import * as React from "react";
const SvgAddIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10 5.332v9.333M5.333 10h9.333"
    />
  </svg>
);
export default SvgAddIcon;
