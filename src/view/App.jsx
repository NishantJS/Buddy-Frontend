import { BrowserRouter as Router } from "react-router-dom";
////components
import Nav from "./components/header/Nav";
import Routes from "./pages/Routes";
import Footer from "./components/Footer";
import useTheme from "../hooks/useTheme";
import Toast from "./components/Toast";

const App = () => {
  useTheme();
  //todo use custom hook for toast
  //todo https://www.deployhq.com/blog/toast-notification-system-in-a-react-redux-application
  
  return (
    <>
      <Router>
        <header>
          <Nav />
        </header>
        <main>
          <Routes />
          <Toast/>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </>
  );
};

export default App;