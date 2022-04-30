import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Quote from "../components/auth/Quote.jsx";
import "../../styles/auth.scss";

const Auth = ({ isSeller = false }) => {
  const location = useLocation();

  const [onLogin, setOnLogin] = useState(
    location.pathname === "/auth/login" ||
      location.pathname === "/auth/login" ||
      location.pathname === "/auth/seller_login" ||
      location.pathname === "/auth/seller_login/"
      ? true
      : false
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

  const path_to = `/auth${isSeller ? "/seller/_" : "/"}${
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
          <Outlet />
        </div>

        <Link to={path_to} onClick={updateOnLogin} className="active_link">
          {location.pathname === "/auth/login" ||
          location.pathname === "/auth/seller_login"
            ? toSignup
            : toLogin}
        </Link>
        <div className="anim"></div>
      </div>
    </section>
  );
};

export default Auth;
