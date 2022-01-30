import "../../../styles/setting.scss";
import { addToast, logoutUser } from "../../services/actions/index.js";
import { useHistory } from "react-router-dom";
import Logout from '../../../icons/Logout.jsx';
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
        <div className="box" onClick={onLogout}>
          <span>Logout</span>
          <Logout />
        </div>
        <ContentMap content={accountOptions} />
      </div>
    </section>
  );
}

export default LoggedIn;
