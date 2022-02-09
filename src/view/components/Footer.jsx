import { Route } from "react-router-dom";

const Footer = () => {
  return (
    <Route exact path={"/"} component={FooterContent} />
  );
};

const FooterContent = () => {
  return <footer>hi</footer>;
};

export default Footer;
