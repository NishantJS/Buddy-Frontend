import { combineReducers } from "redux";
import toast from "./toast";
import auth from "./auth";
import product from "./product";

const rootReducer = combineReducers({
  toast,
  auth,
  product
});

export default rootReducer;
