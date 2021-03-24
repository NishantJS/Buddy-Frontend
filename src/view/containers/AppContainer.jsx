import { BrowserRouter as Router } from "react-router-dom";
////components
import Nav from "../components/header/Nav";
import Routes from "../pages/Routes";
import Footer from "../components/Footer";
import useTheme from "../../hooks/useTheme";
import Toast from "../components/Toast";
import useSession from "../../hooks/useSession";
import useFetch from "../../hooks/useFetch";
import { connect } from "react-redux";
import {addToast, loadProduct, loadUser} from "../services/actions/"

const AppContainer = ({ dispatch }) => {
  useTheme();
  const {msg,error:userError} = useSession("user");
  if (!userError) dispatch(loadUser({ user: msg }))
  else dispatch(addToast({ message: "Session Expired! Please Login Again", color: "danger" }))
  
  const { data, error: productError } = useFetch("shop");
  if (productError) {
    dispatch(
      addToast({
        message: "Load Failed! Please Try to Refresh",
        color: "danger",
      })
    );
  } else {
    dispatch(loadProduct(data))
  }
  return (
    <>
      <Router>
        <header>
          <Nav />
        </header>
        <main>
          <Routes />
          <Toast />
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default connect()(AppContainer);
