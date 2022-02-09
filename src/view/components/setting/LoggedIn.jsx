import "../../../styles/setting.scss";
import { addToast, logoutUser } from "../../services/actions/index.js";
import { useHistory } from "react-router-dom";
import { ContentMap } from "./Container.jsx";

const LoggedIn = ({dispatch}) => {
  let history = useHistory();

  const onLogout = () => {
    dispatch(addToast({ message: "You are signed out", color: "success" }));
    dispatch(logoutUser());
    history.push("/");
  }
  
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
    <section className="container">
      <h4 className="title">Account</h4>
      <div className="box-container">
        <ContentMap content={accountOptions} />
        <div className="box danger" onClick={onLogout}>
          <span>Logout</span>
        </div>
      </div>
    </section>
  );
}

export default LoggedIn;
