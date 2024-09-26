import * as React from "react";
const SvgMicrosoft = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path fill="#FF5722" d="M11 11H3V3h8z" />
    <path fill="#4CAF50" d="M21 11h-8V3h8z" />
    <path fill="#FFC107" d="M21 21h-8v-8h8z" />
    <path fill="#03A9F4" d="M11 21H3v-8h8z" />
  </svg>
);
export default SvgMicrosoft;
