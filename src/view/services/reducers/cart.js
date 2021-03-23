const initialState = {
  data: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        data: [
          ...state.data,
          {
            item: action.cart_item,
            id: action.id,
          },
        ],
      };
    case "REMOVE_CART":
      return {};
    default:
      return state;
  }
};

export default cart;
