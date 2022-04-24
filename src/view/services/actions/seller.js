import { ADD_SELLER } from "../constants/";

export const addSeller = (seller) => {
  return {
    type: ADD_SELLER,
    payload: seller,
  };
};
