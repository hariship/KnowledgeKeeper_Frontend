import * as React from "react";
const SvgProfile = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.334 14v-1.333A2.667 2.667 0 0 0 10.667 10H5.334a2.667 2.667 0 0 0-2.667 2.667V14M8 7.333A2.667 2.667 0 1 0 8 2a2.667 2.667 0 0 0 0 5.333"
    />
  </svg>
);
export default SvgProfile;
