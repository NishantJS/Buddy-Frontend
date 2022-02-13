import { Link, Switch, Route, NavLink, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";
import Notification from "../../../icons/Notification";
import Heart from "../../../icons/Heart";
import Cart from "../../../icons/Cart";
import CompactNav from "./CompactNav";
import Logo from "./Logo";
////style
import "../../../styles/nav.scss";

function Nav() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const location = useLocation();
  const seller = useSelector((state) => state.auth.seller);
  const isSeller = seller &&
    Object.keys(seller).length !== 0 &&
    seller.constructor === Object;
  

  const compact =(
    <Route
      exact
      path={[
        "/my_cart",
        "/my_wishlist",
        "/my_notifications",
        "/auth",
        "/settings",
        "/product/:id"
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
  
  const navToRender = isAuthenticated ? (isSeller? loggedInSeller: loggedIn): loggedOut;

  return (
    <nav>
      <Switch>
        {compact}
        <Route>
          <div className="logo">
            <Link to="/settings">
              <div className="ham">
                <span></span>
                <span></span>
              </div>
            </Link>
            <Link to="/">
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
