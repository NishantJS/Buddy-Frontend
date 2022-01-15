import { useEffect } from "react";

export default function useTheme() {
  // ? Set theme by checking local Storage for theme var
  useEffect(() => {
  let prefer = localStorage.getItem("theme");
  switch (prefer) {
    case "dark":
      document.documentElement.setAttribute("data-theme", "dark");
      break;
    case "light":
      document.documentElement.setAttribute("data-theme", "light");
      break;
    case "system":
    default:
      localStorage.setItem("theme", "system");
      if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
  }
  }, []);
}
