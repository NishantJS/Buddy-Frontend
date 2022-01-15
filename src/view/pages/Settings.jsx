import "../../styles/settings.scss";
import { useSelector } from "react-redux";

const Settings = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <section className="settings">
      {!isAuthenticated ? <Seller/> : <></>}
      <h1>settings</h1>
    </section>
  );
};

const Seller = () => {
  return (
    <div>
      <h1>seller login</h1>
      <h2>seller register</h2>
    </div>
  )
}


export default Settings;
