import {  useEffect } from "react";
import "../../styles/toast.scss";
import { removeToast } from "../services/actions";
import { useSelector, useDispatch } from "react-redux";

const Toast = () => {
  const toast = useSelector((state) => state.toast);

  return (
    <>
      <aside className="toasts">
        {toast && toast.map((item, index) => (
            <ToastItem
              key={index}
              data={{ color: item.color, msg: item.message }}
            />
            ))}
        </aside>
    </>
  );
}

const ToastItem = ({ data: { color="success", msg="Success", id=0 } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(msg));
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg, dispatch]);
  
  return (
    <div className={`toast ${color}`}>
      {msg}
      <span className="delete"></span>
    </div>);
};

export default Toast;
