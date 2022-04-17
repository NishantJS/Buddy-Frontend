import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../services/actions/toast";

const ToastItem = ({ data: { color = "success", message = "Success" } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(message));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [message, dispatch]);

  const handleClick = () => dispatch(removeToast(message));

  return (
    <div className={`toast ${color}`} onClick={handleClick}>
      {typeof message === "string" && message}
    </div>
  );
};

export default ToastItem;
