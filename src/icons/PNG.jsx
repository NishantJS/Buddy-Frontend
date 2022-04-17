import * as React from "react"
import { memo } from "react"

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#303c42"
  >
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M18.5 11.5v-6l-5-5H3A1.5 1.5 0 0 0 1.5 2v20A1.5 1.5 0 0 0 3 23.5h14a1.5 1.5 0 0 0 1.5-1.5v-2.5" />
      <path d="M13.5.5V4A1.5 1.5 0 0 0 15 5.5h3.5" />
    </g>
    <path strokeLinejoin="round" d="M6.5 11.5h16v8h-16z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.5 17.5v-4h1a1 1 0 0 1 1 1h0a1 1 0 0 1-1 1h-1m10-1a1 1 0 0 0-1-1h0a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V16H19m-5.5 1.5v-4h1a1 1 0 0 1 1 1v3"
    />
  </svg>
)

const Memo = memo(SvgComponent)
export default Memo
