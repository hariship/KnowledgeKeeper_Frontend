import * as React from "react";
const SvgActiveCloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="teal"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 5 5 15M5 5l10 10"
    />
  </svg>
);
export default SvgActiveCloseIcon;
