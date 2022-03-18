import { memo, useEffect, useState } from "react";
import axios from "axios";

const Quote = () => {
  const [quote, setQuote] = useState(() => null);

  const updateQuote=(data)=>{
    setQuote(data)
  }
  
  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const fetchQuote = async (path) => {
      try {
        const options = {
          cancelToken: token,
          validateStatus: (status) => status < 511,
        };
        const URL = `${process.env.REACT_APP_ROOT_PATH}${path}`;
        const data = await axios.get(URL, options);
        if (!data) throw new Error("Something went wrong fetching server data!");
        updateQuote(data.data.data);
      } catch (err) {
        console.error(err?.message)
        cancel();
      }
    }
    fetchQuote("quote/random");

    return () => {
      cancel();
    }
  },[])
  
  const toRender = quote?.quote ? (
    <div className="message">
      <blockquote>{quote.quote}</blockquote>
      <span>- {quote.author}</span>
    </div>
  ) : (
    <></>
  );

  return toRender;
};

export default memo(Quote);
