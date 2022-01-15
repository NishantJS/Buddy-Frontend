import { memo } from "react";

function Facebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path fill="#78a2d2" d="M50 15a35 35 0 100 70 35 35 0 100-70z"></path>
      <path
        fill="#1f212b"
        d="M77 64a1 1 0 010-1v-1l2-5a1 1 0 111 0 30 30 0 01-2 5v2a1 1 0 01-1 0zm3-11v-2a30 30 0 00-2-12 1 1 0 011 0 31 31 0 012 12v2a1 1 0 01-1 0zM28 30h-1a1 1 0 010-1 31 31 0 0120-10v1c-7 1-14 4-19 10zm1 43a31 31 0 01-6-38 1 1 0 111 0c-7 12-5 27 6 37a1 1 0 01-1 1zm34 5a1 1 0 010-1 30 30 0 009-6l3-4a1 1 0 011 1 31 31 0 01-3 3 31 31 0 01-10 7z"
      ></path>
      <path
        fill="#fefdef"
        d="M45 84V60h-9v-9h9v-9c-1-9 5-16 20-12l-1 8h-4c-4 0-5 2-5 4v9h10l-2 9h-8v24"
      ></path>
      <g fill="#1f212b">
        <path d="M55 84h-1V59h9l2-8H54v-9c0-3 2-4 6-4h4v-8c-6-1-11-1-15 2-3 2-4 5-4 10v9h-9v8h9v25h-1V60h-9V50h9v-8c0-5 2-9 5-11 2-2 7-4 16-1v9h-5c-4 0-5 1-5 3v8h11l-2 10h-9v24z"></path>
        <path d="M50 86a36 36 0 110-72 36 36 0 010 72zm0-70a34 34 0 100 68 34 34 0 000-68z"></path>
      </g>
    </svg>
  );
}

export default memo(Facebook);
