import { Route, useRouteMatch } from "react-router-dom";

const Footer = () => {
  const matched = useRouteMatch([
    "/product",
  ]);
  return (
    <Route path={"/"} render={() => (matched ? <FooterContent /> : <></>)} />
  );
};

const FooterContent = () => {
  return <footer>hi</footer>;
};

export default Footer;
