import { memo } from "react";

function Google() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        fill="#f9e65c"
        d="M84 44H50v13h21a22 22 0 11-8-25l9-9a35 35 0 1012 21z"
      ></path>
      <path
        fill="#78a2d2"
        d="M50 57h21c-2 5-5 9-9 11l10 9a35 35 0 0012-33H50v13z"
      ></path>
      <path
        fill="#60be92"
        d="M62 68a22 22 0 01-32-9l-11 7a35 35 0 0053 11l-10-9z"
      ></path>
      <path
        fill="#f15b6c"
        d="M30 42a22 22 0 0133-10l9-9a35 35 0 00-53 12l11 7z"
      ></path>
      <path
        fill="#1f212b"
        d="M50 86a36 36 0 1123-64 1 1 0 010 2l-9 9h-2c-3-3-8-4-12-4a21 21 0 1019 29H50l-1-1V44l1-1h34l1 1 1 6c0 20-16 36-36 36zm0-70a34 34 0 1034 29H51v11h20a1 1 0 011 1 23 23 0 11-9-26l8-8c-6-5-14-7-21-7z"
      ></path>
      <path
        fill="#1f212b"
        d="M72 78h-1l-4-4h1l4 3v1zm-6-5l-1-1-2-1 1-1 2 2v1zM28 60v-1l1-1h1v1l-2 1zm-4 3h-1v-1l2-1h1l-2 2zm-5 3h-1v-1l3-2h1v1l-3 2zm6-28h-1l-5-3 1-1 5 3v1zm3 2h-1l-1-1h2v1z"
      ></path>
    </svg>
  );
}

export default memo(Google);
