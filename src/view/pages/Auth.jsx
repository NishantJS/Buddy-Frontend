import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Quote from "../components/auth/Quote.jsx";
import "../../styles/auth.scss";

const Auth = () => {
  const location = useLocation();
  const isSeller = location.pathname?.includes("seller");
  const method = location.pathname?.includes("login");

  const [onLogin, setOnLogin] = useState(
    location.pathname?.includes("login") ? true : false
  );

  const toLogin = (
    <>
      Already Have An Account? <span>Login From Here</span>
    </>
  );

  const toSignup = (
    <>
      New to Buddy? <span>Register From Here</span>
    </>
  );

  const path_to = `/auth${isSeller ? "/seller_" : "/"}${
    onLogin ? "register" : "login"
  }`;

  const updateOnLogin = () => {
    setOnLogin((p) => !p);
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="render">
          <Quote />
          <Outlet isSeller={isSeller} method={method} />
        </div>

        <Link to={path_to} onClick={updateOnLogin} className="active_link">
          {location?.pathname?.includes("login") ? toSignup : toLogin}
        </Link>
        <div className="anim"></div>
      </div>
    </section>
  );
};

export default Auth;
