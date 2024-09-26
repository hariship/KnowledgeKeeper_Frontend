import * as React from "react";
const SvgIntergration = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g
      stroke="#727272"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#intergration_svg__a)"
    >
      <path d="M6.667 8.668a3.333 3.333 0 0 0 5.026.36l2-2A3.334 3.334 0 0 0 8.98 2.315l-1.147 1.14" />
      <path d="M9.333 7.333a3.333 3.333 0 0 0-5.026-.36l-2 2a3.333 3.333 0 0 0 4.713 4.713l1.14-1.14" />
    </g>
    <defs>
      <clipPath id="intergration_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIntergration;
