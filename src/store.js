import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./view/services/reducers";
import thunk from "redux-thunk";
const middleware = thunk;

const store = createStore(
  rootReducer,
  compose(applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__?.()
  )
);

export default store;
