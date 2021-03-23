import { combineReducers } from "redux";
import cart from "./cart";
import toast from "./toast";

const rootReducer = combineReducers({
  cart,
  toast
});

export default rootReducer;
