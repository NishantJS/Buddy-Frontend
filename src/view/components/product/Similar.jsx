import React from "react";
import useFetch from "../../../hooks/useFetch.js";
import Loading from "../Loading.jsx";
import Slider from "../SliderContainer.jsx";

const Similar = ({ uci, id }) => {
  const { data, loading, error } = useFetch(`shop/uci/${uci}?excluded=${id}`);
  return loading ? (
    <Loading />
  ) : error ? (
    <></>
  ) : (
    <Slider slide={{ sliderTitle: "Similar Products", product: data }} />
  );
};

export default Similar;
