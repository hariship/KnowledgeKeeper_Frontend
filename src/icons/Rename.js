import * as React from "react";
const SvgRename = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <g
      stroke="#727272"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#rename_svg__a)"
    >
      <path d="M6.417 2.336H2.333a1.167 1.167 0 0 0-1.166 1.167v8.166a1.167 1.167 0 0 0 1.166 1.167H10.5a1.167 1.167 0 0 0 1.167-1.167V7.586" />
      <path d="M10.792 1.456a1.237 1.237 0 0 1 1.75 1.75L7 8.748l-2.333.583.583-2.333z" />
    </g>
    <defs>
      <clipPath id="rename_svg__a">
        <path fill="#fff" d="M0 0h14v14H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgRename;
