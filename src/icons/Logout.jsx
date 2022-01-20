import { memo } from "react";

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
  >
    <path
      d="M8 21H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h5m7 14 4-4-4-4m4 4H7"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
