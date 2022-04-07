import { useSelector } from "react-redux";
import "../../styles/toast.scss";
import ToastItem from "./ToastItem";

const Toast = () => {
  const toast = useSelector((state) => state.toast);

  return (
    <aside className="toasts">
      {toast &&
        toast.map((item) => <ToastItem key={item?.message} data={item} />)}
    </aside>
  );
};

export default Toast;
