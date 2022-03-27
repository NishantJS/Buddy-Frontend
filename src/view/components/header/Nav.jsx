import { Link, Switch, Route, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Notification from "../../../icons/Notification.jsx";
import Heart from "../../../icons/Heart.jsx";
import Cart from "../../../icons/Cart.jsx";
import CompactNav from "./CompactNav.jsx";
import Logo from "./Logo.jsx";
////style
import "../../../styles/nav.scss";

function Nav() {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const seller = useSelector((state) => state.auth.seller);
  const isSeller = seller._id ? true : false;

  const compact = (
    <Route
      exact
      path={[
        "/my_cart",
        "/my_wishlist",
        "/my_notifications",
        "/auth",
        "/settings",
        "/product/:id",
      ]}
      component={CompactNav}
    />
  );

  const loggedIn = (
    <div className="links">
      <NavLink to="/my_notifications" activeClassName="link_active">
        <Notification />
        <span>Notifications</span>
      </NavLink>
      <NavLink to="/my_wishlist" activeClassName="link_active">
        <Heart />
        <span>Wishlist</span>
      </NavLink>
      <NavLink to="/my_cart" activeClassName="link_active">
        <Cart />
        <span>Cart</span>
      </NavLink>
    </div>
  );

  const loggedOut = (
    <div className="links">
      {location.pathname === "/auth/seller_login" ||
      location.pathname === "/auth/seller_register" ? (
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

  const loggedInSeller = (
    <div className="links">
      <NavLink to="/add_product">Add Product</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );

  const navToRender = isAuthenticated
    ? isSeller
      ? loggedInSeller
      : loggedIn
    : loggedOut;

  return (
    <nav>
      <Switch>
        {compact}
        <Route>
          <div className="logo">
            <Link to="/settings" className="nav_icon" aria-label="settings">
              <div className="ham">
                <span></span>
                <span></span>
              </div>
            </Link>
            <Link to="/" aria-label="back to homepage">
              <Logo />
            </Link>
          </div>
        </Route>
      </Switch>

      {navToRender}
    </nav>
  );
}

export default Nav;
