import { Link, Switch, Route, NavLink } from "react-router-dom";
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
      ]}
      component={CompactNav}
    />
  );

  const loggedIn = (
    <div className="links">
    <NavLink to="/my_notifications">
      <Notification />
    </NavLink>
    <NavLink to="my_wishlist">
      <Heart />
    </NavLink>
    <NavLink to="/my_cart">
      <Cart />
    </NavLink>
  </div>
  );

  const loggedOut = (
    <div className="links">
    <NavLink to="/auth/login">Login</NavLink>
    <NavLink to="/auth/register">Register</NavLink>
  </div >
  );

  
  const loggedInSeller = (
    <div className="links">
      <NavLink to="/auth/login">Add Product</NavLink>
      <NavLink to="/auth/register">Dashboard</NavLink>
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
