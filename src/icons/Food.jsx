import {memo} from "react";

function Food() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
    >
      <path fill="#f1bc19" d="M77 12a1 1 0 100 2 1 1 0 100-2z"></path>
      <path fill="#e4e4f9" d="M50 13a37 37 0 100 74 37 37 0 100-74z"></path>
      <path fill="#f1bc19" d="M83 11a4 4 0 100 8 4 4 0 100-8z"></path>
      <path fill="#8889b9" d="M87 22a2 2 0 100 4 2 2 0 100-4z"></path>
      <path
        fill="#fbcd59"
        d="M81 74a2 2 0 100 4 2 2 0 100-4zM15 59a4 4 0 100 8 4 4 0 100-8z"
      ></path>
      <path fill="#8889b9" d="M25 85a2 2 0 100 4 2 2 0 100-4z"></path>
      <path
        fill="#fff"
        d="M19 49a3 3 0 100 5 3 3 0 100-5zm61-17a2 2 0 100 3 2 2 0 100-3z"
      ></path>
      <path fill="#78cdd4" d="M67 54H53V38l3-9h8l2 9a7 7 0 011 2v14z"></path>
      <path fill="#fff" d="M66 36H53v2a7 7 0 000 2v14h14V40l-1-2v-2z"></path>
      <path
        d="M67 54H53a1 1 0 01-1 0V40a8 8 0 010-3l3-9a1 1 0 011 0h8l3 9v17zm-14-1h13V38l-3-9h-7l-3 9v15z"
        className="B"
      ></path>
      <path fill="#ceccbe" d="M55 27h10v3H55z"></path>
      <path
        d="M65 30H55a1 1 0 01-1 0v-3a1 1 0 011-1h10a1 1 0 010 1v3zm-10-1h9v-2h-9v2z"
        className="B"
      ></path>
      <path fill="#f37e98" d="M40 37a8 8 0 100 15 8 8 0 100-15z"></path>
      <path
        d="M40 52a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8zm0-15a7 7 0 00-7 7 7 7 0 007 7 7 7 0 007-7 7 7 0 00-7-7zm3 3a5 5 0 00-3-1v-1a6 6 0 013 1v1zm-8 2v-1a6 6 0 013-3v1a5 5 0 00-3 2v1zm0 2h-1v-2h1v2h-1z"
        className="B"
      ></path>
      <path
        fill="#f9e65c"
        d="M61 52l-14 5c-1 1-3 0-3-1l-4-10 1-2 14-6 3 1 4 10-1 3z"
      ></path>
      <path
        d="M46 58a3 3 0 01-2-2l-4-9a3 3 0 011-4l14-5a3 3 0 013 1l4 10a3 3 0 01-1 4l-14 5h-1zm10-19a2 2 0 00-1 0l-13 5a2 2 0 00-1 2l4 10a2 2 0 002 1l13-5 1-1a2 2 0 000-1l-4-10a2 2 0 00-1-1z"
        className="B"
      ></path>
      <path
        fill="#60be92"
        d="M32 72a2 2 0 01-1-1l-3-21h44l-3 21a2 2 0 01-1 1H32z"
      ></path>
      <path
        d="M71 50l-2 21a1 1 0 01-1 1H32a1 1 0 01-1-1l-2-21h42m2-1H27l3 22 2 2h36l2-2 3-22z"
        className="B"
      ></path>
      <path fill="#60be92" d="M26 50v-4h48v4H26z"></path>
      <path
        d="M74 46v4H26v-4h48m0-1H26a1 1 0 00-1 1v4a1 1 0 001 1h48a1 1 0 001-1v-4a1 1 0 00-1-1z"
        className="B"
      ></path>
      <use className="C" xlinkHref="#B"></use>
      <use className="B" xlinkHref="#C"></use>
      <use x="8" className="C" xlinkHref="#B"></use>
      <use x="8" className="B" xlinkHref="#C"></use>
      <use x="16" className="C" xlinkHref="#B"></use>
      <use x="16" className="B" xlinkHref="#C"></use>
      <use x="24" className="C" xlinkHref="#B"></use>
      <g className="B">
        <use x="24" xlinkHref="#C"></use>
        <path d="M64 46v-2 2zm0-4v-3a10 10 0 00-1-2v-2l1 2v5zm-1-8l-1-1v-2l1 2v1zm4 35h-1a1 1 0 010-1v-2a1 1 0 011 0v3zm0-4a1 1 0 010-1v-7h1a1 1 0 010 1v6a1 1 0 01-1 1zm1-9a1 1 0 010-1v-3h1a1 1 0 010 1v2a1 1 0 01-1 1z"></path>
      </g>
      <defs>
        <path
          id="B"
          d="M38 67a1 1 0 01-1-1V56a1 1 0 012 0v10a1 1 0 01-1 1z"
        ></path>
        <path
          id="C"
          d="M38 55a1 1 0 011 1v10a1 1 0 11-2 0V56a1 1 0 011-1m0-1a2 2 0 00-2 2v10a2 2 0 104 0V56a2 2 0 00-2-2z"
        ></path>
      </defs>
    </svg>
  );
}

export default memo(Food);
