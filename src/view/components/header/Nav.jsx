import { memo } from "react";
import { useSelector } from "react-redux";

import { Routes as Switch, Route, useLocation } from "react-router-dom";

import CompactNav from "./CompactNav";
import LoggedIn from "./LoggedIn";
import LoggedInSeller from "./LoggedInSeller";
import LoggedOut from "./LoggedOut";
import Ham from "./Ham";

import "../../../styles/nav.scss";

const renderMultiRoutes = ({ element, paths }) =>
  paths.map((path) => <Route key={path} path={path} element={element} />);

const Nav = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const seller = useSelector((state) => state.auth.seller);
  const isSeller = seller._id ? true : false;

  const navToRender = isAuthenticated ? (
    isSeller ? (
      <LoggedInSeller />
    ) : (
      <LoggedIn />
    )
  ) : (
    <LoggedOut pathname={location?.pathname} />
  );

  return (
    <header>
      <nav>
        <Switch>
          {renderMultiRoutes({
            paths: [
              "/my_cart",
              "/my_wishlist",
              "/my_notifications",
              "/auth",
              "/settings",
              "/product/:id",
            ],
            element: <CompactNav />,
          })}
          <Route path="*" element={<Ham />} />
        </Switch>
        {navToRender}
      </nav>
    </header>
  );
};

export default memo(Nav);
