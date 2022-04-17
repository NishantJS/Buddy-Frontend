import setAuthToken from "../factories/setAuthToken";
import { REMOVE_USER } from "../constants/";
import axios from "axios";
import { addSeller } from "./seller";
import { addToast } from "./toast";
import { addUser } from "./user";
import { fetchProduct } from "./product";

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const logoutUser = ({ message = false, isDelete = false }) => {
  return async (dispatch) => {
    try {
      setAuthToken();
      dispatch(deleteLocale());
      dispatch(removeUser());
      dispatch(fetchProduct());
      if (isDelete) {
        const {
          data: { data, error },
        } = await axios.delete("/session", {
          validateStatus: (status) => status < 512,
        });

        if (error) throw new Error("Error removing session");
        dispatch(addToast({ message: data }));
      }
      if (message) dispatch(addToast({ message, color: "danger" }));
    } catch (error) {
      dispatch(addToast({ message: error?.message }));
    }
  };
};

export const deleteLocale = () => {
  return async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("seller");
  };
};

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const reqData = await axios.get("/session", {
        validateStatus: (status) => status < 512,
      });
      const { data, error, seller, user } = reqData.data;

      if (
        typeof reqData?.data === "string" &&
        reqData?.data?.includes("Could not proxy request")
      ) {
        dispatch(
          addToast({
            message: "You are offline! Please try again 📴",
            color: "danger",
          })
        );
        return;
      }

      if (error) throw new Error(data);
      if (user) {
        dispatch(fetchProduct());
        localStorage.removeItem("seller");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(addUser(user));
      } else if (seller) {
        localStorage.removeItem("user");
        localStorage.setItem("seller", JSON.stringify(seller));
        dispatch(addSeller(seller));
      } else {
        dispatch(fetchProduct());
        dispatch(logoutUser({ message: data }));
      }
    } catch (err) {
      dispatch(logoutUser());
      dispatch(fetchProduct());
      dispatch(addToast({ message: err?.message, color: "danger" }));
    }
  };
};

export const addAccount = ({ isSeller = false, user, seller, message }) => {
  return async (dispatch) => {
    try {
      setAuthToken(true);
      dispatch(deleteLocale());
      if (isSeller) {
        dispatch(addSeller(seller));
        localStorage.setItem("user", JSON.stringify(seller));
        dispatch(addToast({ message }));
      } else {
        dispatch(addUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(addToast({ message }));
      }
    } catch (error) {
      dispatch(addToast({ message: error?.message }));
    }
  };
};
