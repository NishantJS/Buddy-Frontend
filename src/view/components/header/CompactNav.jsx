import { Link } from "react-router-dom";
import Back from "../../../icons/Back";
import Logo from "./Logo";

const CompactNav = () => {
  return (
    <div className="logo">
      <Back />
      <Link to="/">
        <Logo />
      </Link>
    </div>
  );
};

export default CompactNav;
