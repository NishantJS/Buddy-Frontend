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

export const removeCart = (id) => ({
  type: REMOVE_CART,
  payload: id,
});

export const addWishlist = (item) => ({
  type: ADD_WISHLIST,
  payload: item,
});

export const removeWishlist = (id) => ({
  type: REMOVE_WISHLIST,
  payload: id,
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
        allowed: cart_item?.allowed,
      };

      const cartItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/cart`,
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

export const removeFromCart = (id) => {
  return async (dispatch) => {
    try {
      const cartItem = await axios.delete(
        `${process.env.REACT_APP_ROOT_PATH}user/cart/${id}`,
        {
          validateStatus: (status) => status < 513,
        }
      );

      if (!cartItem) throw new Error("Something went wrong!");
      if (cartItem.data.error) throw new Error(cartItem.data.data);

      dispatch(addToast({ message: cartItem.data.data }));
      dispatch(removeCart(id));
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
        allowed: wishlist_item?.allowed,
      };

      const wishlistItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/wishlist`,
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

export const removeFromWishlist = (id) => {
  return async (dispatch) => {
    try {
      const wishlistItem = await axios.delete(
        `${process.env.REACT_APP_ROOT_PATH}user/wishlist/${id}`,
        {
          validateStatus: (status) => status < 513,
        }
      );

      if (!wishlistItem) throw new Error("Something went wrong!");
      if (wishlistItem.data.error) throw new Error(wishlistItem.data.data);
      dispatch(addToast({ message: wishlistItem.data.data }));
      dispatch(removeWishlist(id));
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
        `${process.env.REACT_APP_ROOT_PATH}shop`,
        {
          validateStatus: (status) => status < 400,
        }
      );

      if (!product) throw new Error(message);

      dispatch(loadProduct(product.data));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_ROOT_PATH}session`,
        {
          validateStatus: (status) => status < 512,
        }
      );
      if (data.data.error) throw new Error(data.data.data);
      deleteLocale();
      setAuthToken();
      dispatch(removeUser());
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
        `${process.env.REACT_APP_ROOT_PATH}session`,
        {
          validateStatus: (status) => status < 512,
        }
      );
      const { data, error, seller, user } = reqData.data;

      if (!error && !data && !seller && !user) {
        dispatch(logoutUser());
        return;
      }
      if (error && data) throw new Error(data);
      setAuthToken(true);
      if (user) dispatch(addUser(user));
      if (seller) dispatch(addSeller(seller));
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
