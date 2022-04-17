import { useState } from "react";
import "../../../styles/setting.scss";
import { addToast } from "../../services/actions/toast";

const Theme = ({ dispatch }) => {
  const [localTheme, setLocalTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  const themes = ["dark", "light", "system"];

  const changeTheme = (theme) => {
    if (theme === localTheme) {
      dispatch(
        addToast({
          message: `${theme} theme is already applied`,
          color: "danger",
        })
      );
    } else {
      if (theme === "system") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
      } else {
        document.documentElement.setAttribute("data-theme", theme);
      }

      localStorage.setItem("theme", theme);
      dispatch(addToast({ message: `${theme} theme is applied` }));
      setLocalTheme((p) => theme);
    }
  };

  return (
    <article className="container">
      <h4 className="title">Theme</h4>
      <div className="box-container">
        {themes.map((theme) => (
          <div
            className={`box ${theme === localTheme ? "active" : ""}`}
            onClick={() => changeTheme(theme)}
            key={theme}
          >
            <span>{theme}</span>
          </div>
        ))}
      </div>
    </article>
  );
};

export default Theme;
