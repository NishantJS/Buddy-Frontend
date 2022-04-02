import { memo } from "react";
import { NavLink } from "react-router-dom";
import Cart from "../../../icons/Cart";
import Heart from "../../../icons/Heart";
import Notification from "../../../icons/Notification";

const LoggedIn = () => {
  return (
    <div className="links">
      <NavLink to="/my_notifications">
        <Notification />
        <span>Notifications</span>
      </NavLink>
      <NavLink to="/my_wishlist">
        <Heart />
        <span>Wishlist</span>
      </NavLink>
      <NavLink to="/my_cart">
        <Cart />
        <span>Cart</span>
      </NavLink>
    </div>
  );
};

export default memo(LoggedIn);
