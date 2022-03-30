import {
  ADD_USER,
  REMOVE_USER,
  ADD_CART,
  ADD_WISHLIST,
  ADD_SELLER,
  REMOVE_CART,
  REMOVE_WISHLIST,
} from "../constants";

const user = localStorage.getItem("user") ?? false;
const seller = localStorage.getItem("seller") ?? false;

const initialState = {
  isAuthenticated: user || seller ? true : false,
  user: user ? JSON.parse(user) : { cart: [], wishlist: [], _id: false },
  seller: seller ? JSON.parse(seller) : { _id: false },
};

function checkDuplicate(array, payload) {
  return array.some((value) => {
    return value._id === payload._id && value.variant === payload.variant;
  });
}

function removeItem(array, payload) {
  return array.filter(
    (item) => !(item._id === payload.id && item.variant === payload.variant)
  );
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

    case REMOVE_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: removeItem(state.user.cart, payload),
        },
      };

    case REMOVE_WISHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          wishlist: removeItem(state.user.wishlist, payload),
        },
      };

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
        seller: { _id: false },
      };

    case ADD_SELLER:
      return {
        ...state,
        isAuthenticated:
          payload &&
          Object.keys(payload).length !== 0 &&
          payload.constructor === Object,
        seller: payload,
        user: { cart: [], wishlist: [], _id: false },
      };

    case REMOVE_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: { _id: false, cart: [] },
        seller: { _id: false },
      };

    default:
      return state;
  }
}
