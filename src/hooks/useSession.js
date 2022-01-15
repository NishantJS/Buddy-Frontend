import { useEffect, useState } from "react";
import axios from "axios";

export default function useSession(path) {
  let [fetchData, setFetchData] = useState({
    msg: null,
    error: false,
  });

  useEffect(() => {
    let { token, cancel } = axios.CancelToken.source();
    axios
      .get(`http://localhost:5000/${path}`, {
        cancelToken: token,
        validateStatus: (status) => status < 400,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
      })
      .then((response) => {
        setFetchData({
          msg: response.data.msg,
          error: response.data.error,
        });
      })
      .catch((err) => {
        setFetchData({
          error: true,
          msg: err.message || err,
        });
      });

    return () => {
      cancel();
    };
  }, [path]);

  return fetchData;
}
