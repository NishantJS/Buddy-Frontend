import { useState } from "react";
////style
import "../../../styles/sidenav.scss";

const SideNav = () => {
  let isDarkTheme = localStorage.getItem("theme") === "dark" ? true : false;

  const [isDark, setDark] = useState(() => isDarkTheme);

  const updateTheme = () => {
    let root = document.documentElement;

    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <section className="sidenav">
      <h1 onClick={updateTheme}>hif</h1>
      <h1 onClick={updateTheme}>hif</h1>
    </section>
  );
};

export default SideNav;
