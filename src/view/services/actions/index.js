import createToast from "../factories/createToast";

const ADD_CART = "ADD_CART";
export const addCart = (cart_item, id) => ({
  type: ADD_CART,
  cart_item,
  id,
});

export const REMOVE_CART = "REMOVE_CART";
export const removeCart = (id) => ({
  type: REMOVE_CART,
  id,
});

export const ADD_TOAST = "ADD_TOAST";
export const addToast = (options = {}) => {
  return {
    payload: createToast(options),
    type: ADD_TOAST
  };
};

export const REMOVE_TOAST = "REMOVE_TOAST";
export function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST,
  };
}