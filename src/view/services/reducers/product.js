import { LOAD_PRODUCT } from "../constants/";

const initialState = [];

const product = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCT:
      return action.payload;

    default:
      return state;
  }
};

export default product;
