import { combineReducers } from "redux";
import cart from "./cart";
import toast from "./toast";
import auth from "./auth";
import product from "./product";

const rootReducer = combineReducers({
  cart,
  toast,
  auth,
  product
});

export default rootReducer;
