import { memo } from "react";
import useFetch from "../../hooks/useFetch";

const Message = () => {
  const {loading,data,status,error} = useFetch("quote/random");

  error && console.error({error,status})

  return (
    <div className="message">
      {(!loading && data.quote)?<blockquote>{data.quote}</blockquote>: <></>}
        
      {(!loading && data.author) ? <span>- {data.author}</span> : <></>}
    </div>
  );
};

export default memo(Message);
