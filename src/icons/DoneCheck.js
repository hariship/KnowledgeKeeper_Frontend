import * as React from "react";
const SvgDoneCheck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 6 9 17l-5-5"
    />
  </svg>
);
export default SvgDoneCheck;
