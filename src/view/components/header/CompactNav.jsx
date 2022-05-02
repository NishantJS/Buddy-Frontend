import { memo } from "react";
import { Link } from "react-router-dom";

import Back from "../../../icons/Back";
import Logo from "./Logo";

const CompactNav = () => {
  return (
    <div className="logo">
      <Back />
      <Link to="/" className="logo_image">
        <Logo />
      </Link>
    </div>
  );
};

export default memo(CompactNav);
