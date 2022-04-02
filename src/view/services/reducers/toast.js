import { ADD_TOAST, REMOVE_TOAST } from "../constants/";

const initialState = [];

export default function toast(state = initialState, action) {
  const { payload, type } = action;

  const isAlreadyVisible = (visibleToasts, message) =>
    visibleToasts.some((visible) => visible.message === message);

  switch (type) {
    case ADD_TOAST:
      if (!payload.message) return state;
      const match = isAlreadyVisible(state, payload.message);
      return !match ? [...state, payload] : state;

    case REMOVE_TOAST:
      return state.filter((item) => item.message !== payload);

    default:
      return state;
  }
}
