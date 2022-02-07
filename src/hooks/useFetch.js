import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(path) {
  let [fetchData, setFetchData] = useState({
    status: 102,
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let {token,cancel} = axios.CancelToken.source();
    axios
      .get(`${process.env.REACT_APP_ROOT_PATH}${path}`, {
        cancelToken: token,
        validateStatus: (status) => status < 500,
      })
      .then((response) => {
        setFetchData({
          status: response.status,
          data: response.data,
          loading: false,
          error: response.data.error,
        });
      })
      .catch((err) => {
        setFetchData({ status: 500, error: true, loading: false, data: err.message || err });
      });
    
    return ()=>{
      cancel()
     }

  }, [path]);

  return fetchData;
}
