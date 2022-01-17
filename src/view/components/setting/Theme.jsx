import "../../../styles/setting.scss";
import { addToast } from "../../services/actions/index.js";

const Theme = ({dispatch}) => {
  const local_theme = localStorage.getItem("theme");

  const themes = ["dark", "light", "system"]

  const changeTheme = (theme) => {
    if (theme === local_theme) {
      dispatch(addToast({ message: `${theme} theme is already applied`, color: "danger" }));
    }else {
      dispatch(
        addToast({ message: `Theme is changed to ${theme}`, color: "success" })
      );
      localStorage.setItem("theme", theme);
      window.location.reload(false);
    }
  };
  return (
    <section className="container">
      <h4 className="title">Theme</h4>
      <div className="box-container">
        {themes.map((th) => (
          <div className={`box ${th===local_theme?"active":""}`} onClick={()=>changeTheme(th)} key={th}>
            <span>{th}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Theme;
