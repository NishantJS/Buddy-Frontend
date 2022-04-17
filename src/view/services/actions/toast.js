import { ADD_TOAST, REMOVE_TOAST } from "../constants/";

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
