import { Link, Switch, Route, NavLink } from "react-router-dom";
import Search from "../../../icons/Search";
import Notification from "../../../icons/Notification";
import Heart from "../../../icons/Heart";
import Cart from "../../../icons/Cart";
import CompactNav from "./CompactNav";
import Logo from "./Logo";
////style
import "../../../styles/nav.scss";

function Nav() {
  const compact = (
    <Route
      exact
      path={[
        "/my_cart",
        "/my_wishlist",
        "/my_notifications",
        "/search",
        "/auth",
      ]}
      component={CompactNav}
    />
  );

  return (
    <nav>
      <Switch>
        {compact}
        <Route>
          <div className="logo">
            {/* <HamIcon /> */}
            <Link to="/">
              <Logo />
            </Link>
          </div>
        </Route>
      </Switch>

      <div className="links">
        <NavLink to="/auth/login">Login</NavLink>
        <NavLink to="/auth/register">Register</NavLink>
        <NavLink to="/search">
          <Search />
        </NavLink>
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
    </nav>
  );
}



export default Nav;
