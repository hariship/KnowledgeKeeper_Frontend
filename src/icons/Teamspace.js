import * as React from "react";
const SvgTeamspace = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#727272"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2 5.999 6-4.667 6 4.667v7.333a1.333 1.333 0 0 1-1.333 1.333H3.333A1.333 1.333 0 0 1 2 13.332z"
    />
    <path
      stroke="#727272"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 14.667V8h4v6.667"
    />
  </svg>
);
export default SvgTeamspace;
