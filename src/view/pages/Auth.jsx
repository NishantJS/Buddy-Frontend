import { useState } from "react";
import { Link, Switch, Route, useLocation } from "react-router-dom";
import "../../styles/auth.scss";
import Authenticate from "../components/Authenticate";
import Message from "../components/Message";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const location = useLocation();
  const [onLogin, setOnLogin] = useState(
    location.pathname === "/auth/login" || location.pathname === "/auth/login/"
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

  const path_to = onLogin ? "/auth/register" : "/auth/login";

  const updateOnLogin = () => {
    setOnLogin((p) => !p);
  };

  return (
    <section className="auth">
      <div className="container">
        <div className="render">
          <Message  />
          <Switch>
            <Route
              exact
              path="/auth/register"
              children={<Template method="signup" />}
            />
            <Route path="/auth/login" children={<Template method="login" />} />
          </Switch>
        </div>

        <Link to={path_to} onClick={updateOnLogin} className="active_link">
          {location.pathname === "/auth/login" ? toSignup : toLogin}
        </Link>
        <div className="anim"></div>
      </div>
    </section>
  );
};

export default Auth;

const Template = ({ method }) => {
  const [isEmail, setEmail] = useState(false);
  const updateIsEmail = () => {
    setEmail((p) => !p);
  };

  return (
    <>
      <div className="authenticate">
        {isEmail ? (
          <AuthForm handler={updateIsEmail} method={method} />
        ) : (
          <Authenticate method={method} handler={updateIsEmail} />
        )}
      </div>
    </>
  );
};
