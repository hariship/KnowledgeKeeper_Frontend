import * as React from "react";
const SvgImagePreview = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#image-preview_svg__a)">
      <path
        fill="#323232"
        d="M15.833 4.167v11.666H4.167V4.167zm0-1.667H4.167C3.25 2.5 2.5 3.25 2.5 4.167v11.666c0 .917.75 1.667 1.667 1.667h11.666c.917 0 1.667-.75 1.667-1.667V4.167c0-.917-.75-1.667-1.667-1.667m-4.05 7.383-2.5 3.225L7.5 10.95 5 14.167h10z"
      />
    </g>
    <defs>
      <clipPath id="image-preview_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgImagePreview;
