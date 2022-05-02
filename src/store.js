import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import rootReducer from "./view/services/reducers";
import thunk from "redux-thunk";
const middleware = thunk;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__?.() === "undefined"
      ? (a) => a
      : window.__REDUX_DEVTOOLS_EXTENSION__?.()
  )
);

export default store;
