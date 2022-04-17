import { useEffect, useState } from "react";
import { CancelToken, get } from "axios";

export default function useFetch(path = "") {
  const [fetchData, setFetchData] = useState({
    status: 102,
    data: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const { token, cancel } = CancelToken.source();

    const options = {
      cancelToken: token,
      validateStatus: (status) => status < 513,
    };

    const fetchPath = async ({ path, options }) => {
      try {
        const data = await get(`/${path}`, options);
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
    };

    fetchPath({ path, options });

    return () => {
      cancel();
    };
  }, [path]);

  return fetchData;
}
