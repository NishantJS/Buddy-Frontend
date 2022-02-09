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

export const addToCart = (cart_item) => {
  return async (dispatch) => {
    try {
      const body = {
        _id: cart_item._id,
        price: cart_item.price,
        title: cart_item.title,
        thumbnail: cart_item.thumbnail,
        allowed: cart_item.allowed,
        size: cart_item.size
      };

      const cartItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/cart/add`,
        body,
        {
          validateStatus: (status) => status < 402,
        }
      );

      if (!cartItem) throw new Error("Something went wrong!");
      if (cartItem.data.error) throw new Error(cartItem.data.data);
      
      dispatch(addToast({ message: cartItem.data.data}));
      dispatch(addCart(body));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
}

export const removeFromCart = (_id) => {
  return async (dispatch) => {
    try {
      const cartItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/cart/remove`,
        { _id },
        {
          validateStatus: (status) => status < 402,
        }
      );

      if (!cartItem) throw new Error("Something went wrong!");
      if (cartItem.data.error) throw new Error(cartItem.data.data);
      
      dispatch(addToast({ message: cartItem.data.data }));
      dispatch(removeCart(_id));
    } catch (err) {
      dispatch(
        addToast({ message: err.message, color: "danger" })
      );
    }
  };
};


export const addToWishlist = (wishlist_item) => {
  return async (dispatch) => {
    try {
      const body = {
        _id: wishlist_item._id,
        price: wishlist_item.price,
        title: wishlist_item.title,
        thumbnail: wishlist_item.thumbnail,  
        allowed: wishlist_item.allowed,
        size: wishlist_item.size,
      };

      const wishlistItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/wishlist/add`,
        body,
        {
          validateStatus: (status) => status < 511,
        }
      );

      if (!wishlistItem) throw new Error("Something went wrong!");
      if(wishlistItem.data.error) throw new Error(wishlistItem.data.data);
      dispatch(addToast({ message: wishlistItem.data.data }));
      dispatch(addWishlist(body));
    } catch (err) {
      dispatch(
        addToast({ message: err.message, color: "danger" })
      );
    }
  };
};

export const removeFromWishlist = (_id) => {
  return async (dispatch) => {
    try {
      const wishlistItem = await axios.patch(
        `${process.env.REACT_APP_ROOT_PATH}user/wishlist/remove`,
        { _id },
        {
          validateStatus: (status) => status < 402,
        }
        );
        
      if (!wishlistItem) throw new Error("Something went wrong!");
      if (wishlistItem.data.error) throw new Error(wishlistItem.data.data);
      dispatch(addToast({ message: wishlistItem.data.data }));
      dispatch(removeWishlist(_id));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};

export const fetchProduct = () => {
  const message = "Server Error 😔";
  return async dispatch => {
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_ROOT_PATH}shop`,
        {
          validateStatus: (status) => status < 400,
        }
      );

      if (!product) throw new Error(message)
      
      dispatch(loadProduct(product.data))
    } catch (err) {
      dispatch(
        addToast({ message: err.message, color: "danger" })
      );
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt_seller");
    localStorage.removeItem("user");
    localStorage.removeItem("seller");
    setAuthToken();
    dispatch(removeUser());
  };
}

export const fetchUser = () => {
  return async dispatch => {
    const jwt = localStorage.getItem("jwt");;
    if (!jwt) return;
    try {
      const user = await axios.get(`${process.env.REACT_APP_ROOT_PATH}user`, {
        validateStatus: (status) => status < 402,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (user.data.error) throw new Error(user.data.data);

      setAuthToken(jwt);
      localStorage.setItem("user", JSON.stringify(user.data.data));
      dispatch(addUser(user.data.data));
      
    } catch (err) {
      if (err.message === "!JWT") {
        console.info("Create an account for exciting offers for your buddy 🙌");
      } else {
        dispatch(addToast({ message: err.message, color: "danger" }));
      }
    }
  };
};

export const fetchSeller = () => {
  return async (dispatch) => {
    const jwt = localStorage.getItem("jwt_seller");
    if(!jwt) return
    try {
      const seller = await axios.get(
        `${process.env.REACT_APP_ROOT_PATH}seller`,
        {
          validateStatus: (status) => status < 402,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (seller.data.error) throw new Error(seller.data.data)
      
      setAuthToken(jwt);
      localStorage.setItem("seller", JSON.stringify(seller.data.data));
      dispatch(addSeller(seller.data.data));
      
    } catch (err) {
      dispatch( addToast({ message:err.message, color: "danger"}));
    }
  };
};
