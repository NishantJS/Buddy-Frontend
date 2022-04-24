import { useState } from "react";
import Authenticate from "./Authenticate";
import AuthForm from "./AuthForm";

const AuthTemplate = ({ method, isSeller = false }) => {
  const [isEmail, setEmail] = useState(false);
  const updateIsEmail = () => {
    setEmail((p) => !p);
  };

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
