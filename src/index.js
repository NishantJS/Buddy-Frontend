import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { fetchUser, fetchProduct, fetchSeller } from "./view/services/actions";
////components
import App from "./view/App";
////style
import "./styles/global.scss";
import "./styles/index.scss";

store.dispatch(fetchUser());
store.dispatch(fetchSeller());
store.dispatch(fetchProduct());

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
