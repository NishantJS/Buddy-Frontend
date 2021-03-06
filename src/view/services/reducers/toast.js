import {ADD_TOAST,REMOVE_TOAST} from "../constants/"

const initialState = [];

export default function toast(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TOAST:
      const match = state.some((item) => item.message === payload.message)
      if(!match) return[payload, ...state];
      else return  state
    
    case REMOVE_TOAST:
      return state.filter((item)=>item.message!==payload);
    
    default:
      return state;
  }
}
