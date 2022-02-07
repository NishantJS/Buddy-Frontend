import {  useEffect } from "react";
import "../../styles/toast.scss";
import { removeToast } from "../services/actions";
import { useSelector, useDispatch } from "react-redux";

const Toast = () => {
  const toast = useSelector((state) => state.toast);

  return (
    <aside className="toasts">
      {toast &&
        toast.map((item, index) => (
          <ToastItem
            key={index}
            data={{ color: item.color, msg: item.message }}
          />
        ))}
    </aside>
  );
}

const ToastItem = ({ data: { color = "success", msg = "Success" } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(msg));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg, dispatch]);

  const handleClick = () => dispatch(removeToast(msg));
  
  return (
    <div className={`toast ${color}`} onClick={handleClick}>
      {msg}
    </div>
  );
};

export default Toast;
