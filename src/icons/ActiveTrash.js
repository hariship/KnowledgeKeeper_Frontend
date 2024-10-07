import * as React from "react";
const SvgActiveTrash = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g clipPath="url(#active-trash_svg__a)">
      <path
        stroke="#066"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 4h12"
      />
      <g filter="url(#active-trash_svg__b)">
        <path
          stroke="#066"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12.666 3.999v9.333a1.333 1.333 0 0 1-1.333 1.333H4.666a1.333 1.333 0 0 1-1.333-1.333V3.999m2 0V2.665a1.333 1.333 0 0 1 1.333-1.333h2.667a1.333 1.333 0 0 1 1.333 1.333V4"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        stroke="#066"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.667 7.332v4M9.333 7.332v4"
      />
    </g>
    <defs>
      <clipPath id="active-trash_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
      <filter
        id="active-trash_svg__b"
        width={18.333}
        height={22.332}
        x={-1.167}
        y={0.832}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1271_3770"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1271_3770"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgActiveTrash;
