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
  ADD_SELLER
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
    payload: user
  }
}

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
    payload
  }
}

export const fetchProduct = () => {
  const message = "Server Error 😔";
  return async dispatch => {
    try {
      const product = await axios.get("http://localhost:5000/shop", {
        validateStatus: (status) => status < 400
      });

      if (!product) throw new Error(message)
      
      dispatch(loadProduct(product.data))
    } catch (err) {
      dispatch(
        addToast({ message: err.message || message, color: "danger" })
      );
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt_seller");
    setAuthToken();
    dispatch(removeUser());
  };
}

export const fetchUser = () => {
  return async dispatch => {
    if (!localStorage.getItem("jwt")) return;
    try {
      const jwt = localStorage.getItem("jwt");

      const user = await axios.get("http://localhost:5000/user", {
        validateStatus: (status) => status < 402,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (user.data.error) throw new Error(user.data.data);
      setAuthToken(jwt);
      dispatch(addUser(user.data.data));
    } catch (err) {
      if (err.message === "!JWT") {
        console.info("Create an account for exciting offers for your buddy 🙌");
      } else {
        dispatch(addToast({ message: err.message||"Session Expired! 🔚 Please login again. 😃", color: "danger" }));
      }
    }
  };
};

export const fetchSeller = () => {
  return async (dispatch) => {
    if(!localStorage.getItem("jwt_seller")) return
    try {
      const jwt = localStorage.getItem("jwt_seller");
      
      const seller = await axios.get("http://localhost:5000/seller", {
        validateStatus: (status) => status < 402,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if(seller.data.error) throw new Error(seller.data.data)
      setAuthToken(jwt);
      dispatch(addSeller(seller.data.data));
    } catch (err) {
      if (err.message === "!JWT") {
        console.info("Create an account for selling your products to right buddy 🙌");
      } else {
        dispatch(
          addToast({
            message:
            err.message|| "Session Expired! Please login again. 😃",
            color: "danger",
          })
        );
      }
    }
  };
};
