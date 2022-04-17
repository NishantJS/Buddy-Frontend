import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { startupWarning } from "./view/services/actions";
import { fetchUser } from "./view/services/actions/auth";
////components
import App from "./view/App";
////style
import "./styles/global.scss";
import "./styles/index.scss";

store.dispatch(fetchUser());
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
