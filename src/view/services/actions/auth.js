import setAuthToken from "../factories/setAuthToken";
import { ADD_ADDRESS, REMOVE_ADDRESS, REMOVE_USER } from "../constants/";
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

export const addAddress = ({ address, isSeller }) => ({
  type: ADD_ADDRESS,
  payload: address,
  isSeller,
});

export const removeAddress = (index) => ({
  type: REMOVE_ADDRESS,
  payload: index,
});

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
          validateStatus: () => true,
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
        validateStatus: () => true,
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

export const removeFromAddress = (_id, isSeller) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `/${isSeller ? "seller" : "user"}/address/remove/`,
        {
          params: {
            index: _id,
          },
          validateStatus: () => true,
        }
      );

      if (!response) throw new Error("Something went wrong!");
      if (response.data.error) throw new Error(response.data.data);
      dispatch(addToast({ message: response.data.data, color: "danger" }));
      dispatch(removeAddress({ _id, isSeller }));
    } catch (error) {
      dispatch(addToast({ message: error?.message, color: "danger" }));
    }
  };
};
