import { Route, useRouteMatch } from "react-router-dom";

const Footer = () => {
  const matched = useRouteMatch([
    "/my_cart",
    "/my_wishlist",
    "/my_notifications",
    "/search",
    "/auth",
    "/login",
    "/register",
  ]);
  return (
    <Route path={"/"} render={() => (!matched ? <FooterContent /> : null)} />
  );
};

const FooterContent = () => {
  return <h1>Hi</h1>;
};

export default Footer;
