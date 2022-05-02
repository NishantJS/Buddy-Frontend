import { memo } from "react";

import useFetch from "../../../hooks/useFetch.js";

const Quote = () => {
  const { data, error, loading } = useFetch("quote/random");

  const { quote, author } = data?.data || {};

  const toRender =
    !error && quote ? (
      <>
        <blockquote>{quote}</blockquote>
        <span className="animated">- {author}</span>
      </>
    ) : (
      <>
        <blockquote>
          There's a saying. If you want someone to love you forever, buy a dog,
          feed it and keep it around.
        </blockquote>
        <span className="animated">- Dick Dale, American Musician</span>
      </>
    );

  const isLoading = loading ? <>Fetching</> : toRender;

  return <div className="message">{isLoading}</div>;
};

export default memo(Quote);
