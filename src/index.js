import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store";
import {
  fetchUser,
  fetchProduct,
  startupWarning,
} from "./view/services/actions";
////components
import App from "./view/App";
////style
import "./styles/global.scss";
import "./styles/index.scss";

store.dispatch(fetchUser());
store.dispatch(fetchProduct());
store.dispatch(startupWarning());

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
