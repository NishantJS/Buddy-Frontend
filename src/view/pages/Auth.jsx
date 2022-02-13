import { useState } from "react";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import "../../styles/auth.scss";
import Authenticate from "../components/Authenticate.jsx";
import Quote from "../components/Quote.jsx";
import AuthForm from "../components/AuthForm.jsx";

const Auth = ({ isSeller = false }) => {
  const location = useLocation();
  
  const [onLogin, setOnLogin] = useState(
    location.pathname === "/auth/login" ||
      location.pathname === "/auth/login/" ||
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

  const path_to = isSeller
    ? onLogin
      ? "/auth/seller_register"
      : "/auth/seller_login"
    : onLogin
    ? "/auth/register"
      : "/auth/login";
  
  const updateOnLogin = () => {
    setOnLogin((p) => !p);
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="render">
          <Quote/>
          <Switch>
            <Route
              path={isSeller ? "/auth/seller_register" : "/auth/register"}
              children={<Template method="signup" isSeller={isSeller} />}
            />
            
            <Route
              path={isSeller ? "/auth/seller_login" : "/auth/login"}
              children={<Template method="login" isSeller={isSeller} />}
            />
          </Switch>
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

const Template = ({ method, isSeller = false }) => {
  const [isEmail, setEmail] = useState(false);
  const updateIsEmail = () => {
    setEmail((p) => !p);
  };

  return (
    <>
      <div className="authenticate">
        {isEmail ? (
          <AuthForm handler={updateIsEmail} method={method} isSeller={isSeller}/>
        ) : (
          <Authenticate method={method} handler={updateIsEmail} />
        )}
      </div>
    </>
  );
};
