import { useSelector } from "react-redux";
import "../../styles/toast.scss";
import ToastItem from "./ToastItem";

const Toast = () => {
  const toast = useSelector((state) => state.toast);

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

export default Toast;
