import { memo } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Ham = () => {
  return (
    <div className="logo">
      <Link to="/settings" className="nav_icon" aria-label="settings">
        <div className="ham" role={"navigation"}>
          <span></span>
          <span></span>
        </div>
      </Link>
      <Link to="/" aria-label="back to homepage">
        <Logo />
      </Link>
    </div>
  );
};

export default memo(Ham);
