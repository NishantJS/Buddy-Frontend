import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.defaults.withCredentials = true;
    // withCredentials: true,
    // credentials: 'include',
    axios.defaults.withCredentials = true;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    axios.defaults.withCredentials = false;
  }
};

export default setAuthToken;
