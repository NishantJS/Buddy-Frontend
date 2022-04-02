import { useRef } from "react";
import { useEffect } from "react";
import { removeToast } from "../services/actions";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "../../styles/toast.scss";

const Toast = () => {
  const toast = useSelector((state) => state.toast, shallowEqual);

  return (
    <aside className="toasts">
      {toast &&
        toast.map((item, index) => (
          <ToastItem
            key={index}
            data={{ color: item.color, message: item.message }}
          />
        ))}
    </aside>
  );
};

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

export default Toast;
