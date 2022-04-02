import { memo } from "react";
import { NavLink } from "react-router-dom";

const LoggedInSeller = () => {
  return (
    <div className="links">
      <NavLink to="/add_product">Add Product</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );
};

export default memo(LoggedInSeller);
