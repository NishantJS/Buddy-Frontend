import React from "react";
import useFetch from "../../../hooks/useFetch.js";
import Loading from "../Loading.jsx";
import Slider from "../SliderContainer.jsx";

const Similar = ({ seller, id }) => {
  const { data, loading, error } = useFetch(
    `shop/seller/${seller}?excluded=${id}`
  );
  return loading ? (
    <Loading />
  ) : error ? (
    <></>
  ) : (
    <Slider slide={{ sliderTitle: "Similar Products", product: data }} />
  );
};

export default Similar;
