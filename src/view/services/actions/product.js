import { LOAD_PRODUCT } from "../constants/";
import axios from "axios";
import { addToast } from "./toast";

export const loadProduct = (payload = {}) => {
  return {
    type: LOAD_PRODUCT,
    payload,
  };
};

export const fetchProduct = () => {
  const message = "Server Error 😔";
  return async (dispatch) => {
    try {
      const product = await axios.get("/shop", {
        validateStatus: () => true,
      });

      if (!product) throw new Error(message);
      dispatch(loadProduct(product.data));
    } catch (err) {
      dispatch(addToast({ message: err.message, color: "danger" }));
    }
  };
};
