import { ADD_USER, REMOVE_USER } from "../constants/";

const initialState = [];

export default function toast(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_USER:
      return payload;

    case REMOVE_USER:
      return {};

    default:
      return state;
  }
}
