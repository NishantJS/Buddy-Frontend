import { combineReducers } from "redux";
import toast from "./toast";
import auth from "./auth";
import product from "./product";
import add_product from "./product.form";

const rootReducer = combineReducers({
  toast,
  auth,
  product,
  add_product,
});

export default rootReducer;
