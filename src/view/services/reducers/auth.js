import {
  ADD_USER,
  REMOVE_USER,
  ADD_CART,
  ADD_WISHLIST,
  ADD_SELLER,
  REMOVE_CART
} from "../constants";

const initialState = {
  isAuthenticated: false,
  user: {cart:[],wishlist:[]},
  seller: {}
};

function checkDuplicate(array,payload) {
  let check=array.some((value) => {
  if (value._id === payload._id) {
    return true;
  }
  return false;
  })
  return check;
}

function removeItem(array, id) {
  return array.filter(item => item._id !== id);
}

export default function auth(state = initialState, action) {
  const { payload, type } = action;
  
  let isDuplicate;
  switch (type) {
    case ADD_CART:
      isDuplicate = checkDuplicate(state.user.cart, payload);

      if (!isDuplicate) {
        return {
          ...state,
          user: {
            ...state.user,
            cart: [...state.user.cart, payload],
          },
        };
      } else {
        return { ...state };
      }

    case ADD_WISHLIST:
      isDuplicate = checkDuplicate(state.user.wishlist, payload);

      if (!isDuplicate) {
        return {
          ...state,
          user: {
            ...state.user,
            wishlist: [...state.user.wishlist, payload],
          },
        };
      } else {
        return { ...state };
      }

    case ADD_USER:
      return {
        ...state,
        isAuthenticated:
          payload &&
          Object.keys(payload).length !== 0 &&
          payload.constructor === Object,
        user: payload,
        seller: {},
      };

    case ADD_SELLER:
      return {
        ...state,
        user: {},
        isAuthenticated:
          payload &&
          Object.keys(payload).length !== 0 &&
          payload.constructor === Object,
        seller: payload,
      };

    case REMOVE_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: { cart: []},
        seller: {},
      };
    
    case REMOVE_CART:
      const updatedArray = removeItem(state.user.cart, payload);
      
      return {
        state: {
          ...state,
          user: {
            ...state.user,
            cart: updatedArray
          },
        },
      };

    default:
      return state;
  }
}
