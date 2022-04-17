import { addToast } from "./toast";

export const startupWarning = () => {
  return async (dispatch) => {
    try {
      dispatch(
        addToast({
          message:
            "Still working on dark mode. Please check using light mode only. (you can click to close any toast)",
          color: "danger",
        })
      );
    } catch (err) {
      console.info(
        "Still working on dark mode. Please check using light mode only."
      );
      console.error(err);
    }
  };
};
