import "../../styles/setting.scss";
import { useSelector } from "react-redux";
import SellerLogged from "../components/setting/SellerLogged";
import UserLogged from "../components/setting/UserLogged";
import Theme from "../components/setting/Theme";
import { connect } from "react-redux";

const Settings = ({dispatch}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <section className="settings">
      {!isAuthenticated ? <SellerLogged /> : <UserLogged dispatch={dispatch}/>}
      <Theme dispatch={dispatch}/>
    </section>
  );
};

export default connect()(Settings);
