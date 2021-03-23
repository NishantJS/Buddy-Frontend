import {ADD_CART,REMOVE_CART} from "../constants/"

const initialState = []

const cart = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART:
      return [...state, action.cart_item,];
    
    case REMOVE_CART:
      return {};
    
    default:
      return state;
  }
};

export default cart;
