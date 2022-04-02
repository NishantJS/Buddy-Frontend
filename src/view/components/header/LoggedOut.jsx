import { memo } from "react";
import { NavLink } from "react-router-dom";

const LoggedOut = ({ pathname }) => {
  return (
    <div className="links">
      {pathname === "/auth/seller_login" ||
      pathname === "/auth/seller_register" ? (
        <>
          <NavLink to="/auth/seller_login">Login</NavLink>
          <NavLink to="/auth/seller_register">Register</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/auth/login">Login</NavLink>
          <NavLink to="/auth/register">Register</NavLink>
        </>
      )}
    </div>
  );
};

export default memo(LoggedOut);
