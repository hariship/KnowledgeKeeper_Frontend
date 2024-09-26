import * as React from "react";
const SvgEyeOn = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#323232"
      fillRule="evenodd"
      d="M16.85 7.05a7 7 0 0 0-9.9 0L4.829 9.172c-1.334 1.333-2 2-2 2.828s.666 1.495 2 2.828l2.12 2.122a7 7 0 0 0 9.9 0l2.122-2.122c1.333-1.333 2-2 2-2.828s-.667-1.495-2-2.828zM12 8.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5"
      clipRule="evenodd"
      opacity={0.1}
    />
    <path
      stroke="#323232"
      strokeWidth={2}
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      stroke="#323232"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.95 7.05a7 7 0 0 1 9.9 0l2.12 2.122c1.334 1.333 2 2 2 2.828s-.666 1.495-2 2.828l-2.12 2.122a7 7 0 0 1-9.9 0l-2.122-2.122c-1.333-1.333-2-2-2-2.828s.667-1.495 2-2.828z"
    />
  </svg>
);
export default SvgEyeOn;
