import setAuthToken from "../factories/setAuthToken";
import {
  ADD_CART,
  REMOVE_CART,
  ADD_TOAST,
  REMOVE_TOAST,
  ADD_USER,
  REMOVE_USER,
  LOAD_PRODUCT,
  REMOVE_WISHLIST,
  ADD_WISHLIST,
  ADD_SELLER,
} from "../constants/";
import axios from "axios";

export const addCart = (cart_item) => ({
  type: ADD_CART,
  payload: cart_item,
});

export const removeCart = (id, variant = 0) => ({
  type: REMOVE_CART,
  payload: { id, variant },
});

export const addWishlist = (item) => ({
  type: ADD_WISHLIST,
  payload: item,
});

export const removeWishlist = (id, variant = 0) => ({
  type: REMOVE_WISHLIST,
  payload: { id, variant },
});

export const addToast = (options = {}) => {
  return {
    type: ADD_TOAST,
    payload: options,
  };
};

export const removeToast = (id) => {
  return {
    type: REMOVE_TOAST,
    payload: id,
  };
};

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const addSeller = (seller) => {
  return {
    type: ADD_SELLER,
    payload: seller,
  };
};

export const loadProduct = (payload = {}) => {
  return {
    type: LOAD_PRODUCT,
    payload,
  };
};

export const addToCart = (cart_item) => {
  return async (dispatch) => {
    try {
      const body = {
        _id: cart_item?._id,
        sizes: cart_item?.sizes,
        title: cart_item.title,
        thumbnail: cart_item?.thumbnail || cart_item?.images[0],
        variant: cart_item?.variant || 0,
        uci: cart_item?.uci,
      };

      const cartItem = await axios.patch(
        `${process.env.REACT_APP_PROXY_URL}user/cart`,
        body,
        {
          validateStatus: (status) => status < 513,
        }
      );

      if (!cartItem) throw new Error("Something went wrong!");
      if (cartItem.data.error) throw new Error(cartItem.data.data);

      dispatch(addToast({ message: cartItem.data.data }));
      dispatch(addCart(body));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const removeFromCart = (id, variant = 0) => {
  return async (dispatch) => {
    try {
      const cartItem = await axios.delete(
        `${process.env.REACT_APP_PROXY_URL}user/cart/`,
        {
          params: {
            id,
            variant,
          },
          validateStatus: (status) => status < 513,
        }
      );

      if (!cartItem) throw new Error("Something went wrong!");
      if (cartItem.data.error) throw new Error(cartItem.data.data);

      dispatch(addToast({ message: cartItem.data.data, color: "danger" }));
      dispatch(removeCart(id, variant));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const addToWishlist = (wishlist_item) => {
  return async (dispatch) => {
    try {
      const body = {
        _id: wishlist_item._id,
        sizes: wishlist_item?.sizes,
        title: wishlist_item.title,
        thumbnail: wishlist_item?.thumbnail || wishlist_item?.images[0],
        variant: wishlist_item?.variant || 0,
        uci: wishlist_item?.uci,
      };

      const wishlistItem = await axios.patch(
        `${process.env.REACT_APP_PROXY_URL}user/wishlist`,
        body,
        {
          validateStatus: (status) => status < 513,
        }
      );

      if (!wishlistItem) throw new Error("Something went wrong!");
      if (wishlistItem.data.error) throw new Error(wishlistItem.data.data);

      dispatch(addToast({ message: wishlistItem.data.data }));
      dispatch(addWishlist(body));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const removeFromWishlist = (id, variant = 0) => {
  return async (dispatch) => {
    try {
      const wishlistItem = await axios.delete(
        `${process.env.REACT_APP_PROXY_URL}user/wishlist/`,
        {
          params: {
            id,
            variant,
          },
          validateStatus: (status) => status < 513,
        }
      );

      if (!wishlistItem) throw new Error("Something went wrong!");
      if (wishlistItem.data.error) throw new Error(wishlistItem.data.data);
      dispatch(addToast({ message: wishlistItem.data.data, color: "danger" }));
      dispatch(removeWishlist(id, variant));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const fetchProduct = () => {
  const message = "Server Error 😔";
  return async (dispatch) => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}shop`,
        {
          validateStatus: (status) => status < 513,
        }
      );

      if (!product) throw new Error(message);
      dispatch(loadProduct(product.data));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const logoutUser = ({ message = false, isDelete = false }) => {
  return async (dispatch) => {
    try {
      setAuthToken();
      dispatch(deleteLocale());
      dispatch(removeUser());
      if (isDelete) {
        const {
          data: { data, error },
        } = await axios.delete(`${process.env.REACT_APP_PROXY_URL}session`, {
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
      const reqData = await axios.get(
        `${process.env.REACT_APP_PROXY_URL}session`,
        {
          validateStatus: (status) => status < 512,
        }
      );
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

      // dispatch(deleteLocale());
      if (error) throw new Error(data);
      if (user) {
        localStorage.removeItem("seller");
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(addUser(user));
      } else if (seller) {
        localStorage.removeItem("user");
        localStorage.setItem("seller", JSON.stringify(seller));
        dispatch(addSeller(seller));
      } else dispatch(logoutUser({ message: data }));
    } catch (err) {
      dispatch(logoutUser());
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
