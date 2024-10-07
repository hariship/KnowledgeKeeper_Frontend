import * as React from "react";
const SvgActiveRightArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#066"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6 12 4-4-4-4"
    />
  </svg>
);
export default SvgActiveRightArrow;
