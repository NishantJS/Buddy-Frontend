import { memo } from "react";
import useFetch from "../../../hooks/useFetch.js";
// import axios from "axios";

const Quote = () => {
  const { data, error } = useFetch("quote/random");

  const { quote, author } = data?.data || {};

  const toRender =
    !error && quote ? (
      <div className="message">
        <blockquote>{quote}</blockquote>
        <span>- {author}</span>
      </div>
    ) : (
      <></>
    );

  return toRender;
};

export default memo(Quote);
