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

export const addSeller = (seller) => {
  return {
    type: ADD_SELLER,
    payload: seller,
  };
};
