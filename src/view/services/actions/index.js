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
  REMOVE_SELLER
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

export const removeSeller = () => {
  return {
    type: REMOVE_SELLER,
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

export const fetchUser = () => {
  return async dispatch => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("!JWT");

      const user = await axios.get("http://localhost:5000/user", {
        validateStatus: (status) => status < 400,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setAuthToken(jwt);
      dispatch(addUser(user.data.msg));
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
    try {
      const jwt = localStorage.getItem("jwt_seller");
      if (!jwt) throw new Error("!JWT");

      const seller = await axios.get("http://localhost:5000/seller", {
        validateStatus: (status) => status < 400,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setAuthToken(jwt);
      dispatch(addSeller(seller.data.msg));
    } catch (err) {
      if (err.message === "!JWT") {
        console.info("Create an account for selling your products to right buddy 🙌");
      } else {
        dispatch(
          addToast({
            message:
              err.message || "Session Expired! 🔚 Please login again. 😃",
            color: "danger",
          })
        );
      }
    }
  };
};
