// import useFetch from "../../hooks/useFetch.js";
import NotFound from "./NotFound.jsx";
import Loading from "../components/Loading.jsx";
// import Cart from "../../icons/Cart.jsx";
// import Heart from "../../icons/Heart.jsx";
import "../../styles/product.scss";
// import { useSelector } from "react-redux";
import { useState } from "react";
import Description from "../components/product/Description.jsx";
import Sizes from "../components/product/Sizes.jsx";
// import Images from "../components/product/Images.jsx";
import { useLocation } from "react-router-dom";
// import axios from "axios";

const Product = () => {
  const location = useLocation();
  const { state = false, search, pathname } = location;
  console.log({ location, state, search, pathname });

  const toRender = !state ? (
    <FetchProductDetails search={search} pathname={pathname} />
  ) : (
    <ProductDetails data={state} variant={state?.variant} />
  );
  return toRender;
  // return <>h</>;
};

const FetchProductDetails = ({ search, pathname }) => {
  // const product_id = pathname.split("/")[2] || 0;
  // console.log(product_id);
  // const searchParams = new URLSearchParams(search);
  // const category = searchParams.get("category");
  // const variant = Number.parseInt(searchParams.get("variant")) || 0;

  // const { data, loading, error } = axios.get(
  //   `shopppppe/${product_id}?category=${category}`
  // );

  // console.log({ data, loading, error });

  // const toRender = loading ? (
  //   <Loading />
  // ) : error || !data ? (
  //   <NotFound />
  // ) : (
  //   <ProductDetails data={data.data} variant={variant} />
  // );
  // return toRender;
  return <h1>hi</h1>;
};

const ProductDetails = ({ data, variant = 0 }) => {
  const { sizes = [], title = "", description = {}, images = [] } = data;

  // const user = useSelector((state) => state.auth.user);

  // const isUser = user._id ? true : false;
  const [selectedSize, setSelectedSize] = useState(
    variant < sizes.length ? variant : 0
  );

  const updateSelected = (index) => {
    setSelectedSize((p) => index);
  };

  return (
    <section className="product">
      {/* <Images images={images} title={title} /> */}
      <Details>
        <Sizes
          sizes={sizes}
          updateSelected={updateSelected}
          selectedSize={selectedSize}
        />
        <Description description={description} />
      </Details>
      hello
    </section>
  );
};

export default Product;

const Details = ({ children }) => {
  return <div className="details">{children}</div>;
};
