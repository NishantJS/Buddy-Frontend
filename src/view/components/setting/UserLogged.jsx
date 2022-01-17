import "../../../styles/setting.scss";
import { removeUser, addToast } from "../../services/actions/index.js";
import { useHistory } from "react-router-dom";
import Logout from '../../../icons/logout.svg';

const UserLogged = ({dispatch}) => {
  let history = useHistory();
    // const userData = useSelector((state) => state.auth.user);
  const onLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(addToast({ message: "You are signed out", color: "success" }));
    dispatch(removeUser());
    history.push("/");
  }
  
  return (
    <section className="container">
      <h4 className="title">Account</h4>
      <div className="box-container">
        <div className="box" onClick={onLogout}>
          <span>Logout</span>
          <img src={Logout} alt="Logout" />
        </div>
        <div className="box">
          <span onClick={onLogout}>Logout</span>
        </div>
        <div className="box">
          <span onClick={onLogout}>Logout</span>
        </div>
      </div>
    </section>
  );
}

export default UserLogged;
