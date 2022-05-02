import { useState } from "react";

import Authenticate from "./Authenticate";
import AuthForm from "./AuthForm";

const AuthTemplate = ({ path }) => {
  const [isEmail, setEmail] = useState(false);
  const updateIsEmail = () => {
    setEmail((p) => !p);
  };

  const isSeller = path?.includes("seller");
  const method = path?.includes("login") ? "login" : "signup";

  return (
    <>
      <div className="authenticate">
        {isEmail ? (
          <AuthForm
            handler={updateIsEmail}
            method={method}
            isSeller={isSeller}
          />
        ) : (
          <Authenticate
            method={method}
            handler={updateIsEmail}
            isSeller={isSeller}
          />
        )}
      </div>
    </>
  );
};

export default AuthTemplate;
