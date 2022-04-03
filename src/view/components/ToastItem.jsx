import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../services/actions";

const ToastItem = ({ data: { color = "success", message = "Success" } }) => {
  const dispatch = useDispatch();
  const hide = useRef(null);
  useEffect(() => {
    hide.current?.classList?.add?.("disappear");
    const timer = setTimeout(() => {
      dispatch(removeToast(message));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message, dispatch]);

  const handleClick = () => dispatch(removeToast(message));

  return (
    <div className={`toast ${color}`} onClick={handleClick} ref={hide}>
      {typeof message === "string" && message}
    </div>
  );
};

export default ToastItem;
