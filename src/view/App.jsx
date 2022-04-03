import { BrowserRouter as Router } from "react-router-dom";
////components
import Nav from "./components/header/Nav";
import Routes from "./pages/Routes";
import Footer from "./components/Footer";
import useTheme from "../hooks/useTheme";
import Toast from "./components/Toast";

const App = () => {
  useTheme();

  return (
    <>
      <Router>
        <Nav />
        <main>
          <Routes />
          <Toast />
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
