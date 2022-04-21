import { memo } from "react";
import { ReactComponent as LogoSvg } from "../../../icons/logo.svg";

const Logo = () => {
  return (
    <>
      <LogoSvg fill="currentColor" />
      <h1 className="logo_txt">BuddyShop</h1>
    </>
  );
};

export default memo(Logo);
