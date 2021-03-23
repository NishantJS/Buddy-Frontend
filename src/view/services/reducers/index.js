import { combineReducers } from "redux";
import cart from "./cart";
import toast from "./toast";
import user from "./user";

const rootReducer = combineReducers({
  cart,
  toast,
  user
});

export default rootReducer;
