import { logoutUser } from "../../services/actions/index.js";
import { useHistory } from "react-router-dom";
import { ContentMap } from "./Container.jsx";
import "../../../styles/setting.scss";

const LoggedIn = ({ dispatch }) => {
  let history = useHistory();

  const onLogout = () => {
    dispatch(logoutUser({ isDelete: true }));
    history.push("/");
  };

  const accountOptions = [
    {
      path: "/profile",
      title: "Edit Profile",
    },
    {
      path: "/change_password",
      title: "Change Password",
    },
  ];

  return (
    <article className="container">
      <h4 className="title">Account</h4>
      <div className="box-container">
        <ContentMap content={accountOptions} />
        <div className="box danger" onClick={onLogout}>
          <span>Logout</span>
        </div>
      </div>
    </article>
  );
};

export default LoggedIn;
