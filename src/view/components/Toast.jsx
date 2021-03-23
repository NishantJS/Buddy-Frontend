import { useState, useEffect } from "react";

const Toast = ({ message, timer, type }) => {
  
  const [visible, setVisible] = useState(false);

  // todo figure to pass props from any component
  useEffect(() => {
    setTimeout(() => {
      setVisible(()=>true)
    },timer)
  },[timer])
  
  return (
    <div className="toast">
      
    </div>
  )
}

export default Toast

