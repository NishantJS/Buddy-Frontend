import {
  ADD_PRODUCT_FORM_SECTION,
  REMOVE_PRODUCT_FORM_SECTIONS,
} from "../constants/";

const initialState = {};

const product = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_FORM_SECTION:
      return { ...state, ...action.payload };

    case REMOVE_PRODUCT_FORM_SECTIONS:
      return initialState;

    default:
      return state;
  }
};

export default product;
