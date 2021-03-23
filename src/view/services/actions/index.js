import {ADD_CART,REMOVE_CART,ADD_TOAST,REMOVE_TOAST, ADD_USER,REMOVE_USER} from "../constants/"

export const addCart = (cart_item) => ({
  type: ADD_CART,
  payload:cart_item
});

export const removeCart = (id) => ({
  type: REMOVE_CART,
  payload: id,
});

export const addToast = (options = {}) => {
  return {
    type: ADD_TOAST,
    payload: options
  };
};

export const removeToast=(id)=> {
  return {
    type: REMOVE_TOAST,
    payload: id
  };
};

export const addUser = (user_data = {})=>{
  return {
    type: ADD_USER,
    payload: user_data
  }
};

export const removeUser = ()=>{
  return {
    type: REMOVE_USER
  }
}