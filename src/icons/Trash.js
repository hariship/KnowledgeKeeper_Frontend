import * as React from "react";
const SvgTrash = (props) => (
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
      d="M2 4h12M12.667 3.999v9.333a1.333 1.333 0 0 1-1.333 1.333H4.667a1.333 1.333 0 0 1-1.333-1.333V3.999m2 0V2.665a1.333 1.333 0 0 1 1.333-1.333h2.667a1.333 1.333 0 0 1 1.333 1.333V4M6.667 7.332v4M9.334 7.332v4"
    />
  </svg>
);
export default SvgTrash;
