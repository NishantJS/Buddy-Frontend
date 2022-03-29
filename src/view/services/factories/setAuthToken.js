import axios from "axios";
const setAuthToken = (token = false) => {
  if (token) {
    axios.defaults.withCredentials = true;
  } else {
    axios.defaults.withCredentials = false;
  }
};

export default setAuthToken;
