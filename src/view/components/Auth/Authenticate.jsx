import Google from "../../../icons/Google.jsx";
import Facebook from "../../../icons/Facebook.jsx";
import Email from "../../../icons/Email.jsx";
import { useNavigate } from "react-router-dom";

const authData = [
  {
    label: "Google",
    icon: <Google />,
  },
  {
    label: "Facebook",
    icon: <Facebook />,
  },
  {
    label: "Email",
    icon: <Email />,
  },
];

const Authenticate = ({ method, handler, isSeller }) => {
  let navigate = useNavigate();
  const openChildWindow = (url, windowName, w, h) => {
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
    return window.open(
      url,
      windowName,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
    );
  };
  const clickHandler = (index) => {
    if (index === 2) return handler();
    if (!(index === 0 || index === 1)) return;
    const provider = index === 0 ? "google" : "facebook";
    const role = isSeller ? "seller" : "user";
    const win = openChildWindow(
      `http://localhost:8080/v1/auth/${provider}/${role}`,
      "Buddyshop login",
      500,
      500
    );
    win.focus();
    const timer = setInterval(() => {
      if (win.closed) {
        clearInterval(timer);
        navigate("/auth_redirect");
      }
    }, 100);
  };

  return (
    <>
      {authData.map(({ label, icon }, index) => {
        return (
          <article onClick={() => clickHandler(index)} key={label}>
            {icon}
            <span>
              {method} with {label}
            </span>
          </article>
        );
      })}
    </>
  );
};

export default Authenticate;
