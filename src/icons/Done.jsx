import { memo } from "react"

const SvgComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
    <path d="M26.98 5.99a1 1 0 0 0-.687.303L11 21.586l-6.293-6.293a1 1 0 1 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l16-16a1 1 0 0 0-.727-1.717z" />
  </svg>
)

const Memo = memo(SvgComponent)
export default Memo
