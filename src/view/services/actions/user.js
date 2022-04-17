import {
  ADD_CART,
  REMOVE_CART,
  ADD_USER,
  REMOVE_USER,
  REMOVE_WISHLIST,
  ADD_WISHLIST,
} from "../constants/";
import axios from "axios";
import { addToast } from "./toast";

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

      const cartItem = await axios.patch("/user/cart", body, {
        validateStatus: (status) => status < 513,
      });

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
      const cartItem = await axios.delete("/user/cart/", {
        params: {
          id,
          variant,
        },
        validateStatus: (status) => status < 513,
      });

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

      const wishlistItem = await axios.patch("/user/wishlist", body, {
        validateStatus: (status) => status < 513,
      });

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
      const wishlistItem = await axios.delete("/user/wishlist/", {
        params: {
          id,
          variant,
        },
        validateStatus: (status) => status < 513,
      });

      if (!wishlistItem) throw new Error("Something went wrong!");
      if (wishlistItem.data.error) throw new Error(wishlistItem.data.data);
      dispatch(addToast({ message: wishlistItem.data.data, color: "danger" }));
      dispatch(removeWishlist(id, variant));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};
