import {
  REMOVE_USER,
  ADD_USER,
  LOAD_USER,
} from "../constants";

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function auth(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_USER:
    case ADD_USER:
    return {
      ...state,
      isAuthenticated: payload && Object.keys(payload).length !== 0 && payload.constructor === Object,
      user: payload,
    };

    case REMOVE_USER:
      return {};

    default:
      return state;
  }
}
