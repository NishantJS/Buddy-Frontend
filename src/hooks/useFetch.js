import { useEffect, useState } from "react";
import { CancelToken, get as Get} from "axios";

export default function useFetch(path="") {
  let [fetchData, setFetchData] = useState({
    status: 102,
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const { token, cancel } = CancelToken.source();
    
    const options = {
      cancelToken: token,
      validateStatus: (status) => status < 511,
    };

    const URL = `${process.env.REACT_APP_ROOT_PATH}${path}`;
      
    const fetchPath = async ({ URL, options }) => {
      try {
        const data = await Get(URL, options);
        setFetchData({
          status: data.status,
          data: data.data,
          loading: false,
          error: data.data.error,
        });
      } catch (err) {
        setFetchData({
          status: 500,
          error: true,
          loading: false,
          data: err?.message,
        });
      }
    }

    fetchPath({ URL, options });

    return () => {
      cancel();
    }

  }, [path]);

  return fetchData;
}
