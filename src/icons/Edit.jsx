import { memo } from "react";

const Edit = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinejoin="round"
    strokeWidth={2}
  >
    <path
      d="M19 13.66V19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.34"
      strokeLinecap="round"
    />
    <path d="m17 1 4 4-10 10H7v-4z" />
  </svg>
);

const Memo = memo(Edit);
export default Memo;
