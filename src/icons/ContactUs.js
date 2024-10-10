import * as React from "react";
const SvgContactUs = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#contact-us_svg__a)"
    >
      <path d="M8 14.665A6.667 6.667 0 1 0 8 1.332a6.667 6.667 0 0 0 0 13.333" />
      <path d="M6.06 6a2 2 0 0 1 3.887.667c0 1.333-2 2-2 2M8 11.332h.007" />
    </g>
    <defs>
      <clipPath id="contact-us_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgContactUs;
