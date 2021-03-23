import { useEffect } from "react";

export default function useTheme() {
  // todo Check if there is a theme chosen in local storage
  useEffect(() => {
    // !localStorage.getItem("theme") && localStorage.setItem("theme", "dark");

    localStorage.getItem("theme") === "dark"
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "");    
  }, []);
}
