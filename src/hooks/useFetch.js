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
      .get(`http://localhost:5000/${path}`, {
        cancelToken: token,
        validateStatus: (status) => status < 400,
      })
      .then((response) => {
        setFetchData({
          status: 200,
          data: response.data,
          loading: false,
          error: false,
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
