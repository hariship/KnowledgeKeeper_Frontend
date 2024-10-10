import * as React from "react";
const SvgDropdown = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m4 6 4 4 4-4"
    />
  </svg>
);
export default SvgDropdown;
