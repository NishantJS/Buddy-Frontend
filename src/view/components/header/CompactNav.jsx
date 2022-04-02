import { Link } from "react-router-dom";
import { memo } from "react";
import Back from "../../../icons/Back.jsx";
import Logo from "./Logo.jsx";

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

export default memo(CompactNav);
