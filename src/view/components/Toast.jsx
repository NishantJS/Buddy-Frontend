import {  useEffect } from "react";
import { connect } from "react-redux";
import "../../styles/toast.scss";
import { removeToast } from "../services/actions";

const Toast = ({toast ,dispatch}) => {
  return (
    <>
      <aside className="toasts">
        {toast && toast.map((item, index) => (
            <ToastItem
              key={index}
              data={{ color: item.color, msg: item.message }} dispatch={dispatch}
            />
            ))}
        </aside>
    </>
  );
}

const ToastItem = ({ dispatch, data: { color, msg, id } }) => {
  useEffect(() => {
    const timer=setTimeout(() => {
      dispatch(removeToast(msg))
    }, 4000);
    return () => {
      clearTimeout(timer);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg])
  
  return (
    <div className={`toast ${color}`}>
      {msg}{id}
      <span className="delete"></span>
    </div>);
};


const mapStateToProps = (state) => ({
  toast : state.toast,
});

export default connect(mapStateToProps)(Toast);
