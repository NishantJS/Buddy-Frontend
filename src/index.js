import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
////components
import App from "./view/App";
////style
import "./styles/global.scss";
import "./styles/index.scss";
import { fetchUser,fetchProduct,fetchSeller } from "./view/services/actions";

if (localStorage.getItem("jwt_seller")) {
  store.dispatch(fetchSeller());
}else store.dispatch(fetchUser());

store.dispatch(fetchProduct());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
