import { Route, Routes as Switch } from "react-router-dom";

const Footer = () => {
  return (
    <Switch>
      <Route path="/" element={<footer>hi</footer>} />
      <Route path="*" element={<></>} />
    </Switch>
  );
};

export default Footer;
