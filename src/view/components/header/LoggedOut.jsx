import { memo } from "react";
import { NavLink } from "react-router-dom";

const LoggedOut = ({ pathname }) => {
  return (
    <div className="links">
      {pathname?.includes("seller") ? (
        <>
          <NavLink to="/auth/seller_login" className="animated">
            Login
          </NavLink>
          <NavLink to="/auth/seller_register" className="animated">
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/auth/login" className="animated">
            Login
          </NavLink>
          <NavLink to="/auth/register" className="animated">
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default memo(LoggedOut);
