import setAuthToken from "../factories/setAuthToken";

import {
  ADD_CART,
  REMOVE_CART,
  ADD_TOAST,
  REMOVE_TOAST,
  ADD_USER,
  REMOVE_USER,
  LOAD_USER,
  LOAD_PRODUCT
} from "../constants/";

export const addCart = (cart_item) => ({
  type: ADD_CART,
  payload: cart_item,
});

export const removeCart = (id) => ({
  type: REMOVE_CART,
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

export const addUser = ({ token, user }) => {
  localStorage.setItem("jwt", token);
  setAuthToken(token)
  return {
    type: ADD_USER,
    payload: user
  };
};

export const loadUser = ({ user }) => {
  return {
    type: LOAD_USER,
    payload: user
  }
}
export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const loadProduct = (payload = {}) => {
  return {
    type: LOAD_PRODUCT,
    payload
  }
}