import useFetch from "../../hooks/useFetch.js";
import NotFound from "./NotFound.jsx";
import Loading from "../components/Loading.jsx";
// import Cart from "../../icons/Cart.jsx";
// import Heart from "../../icons/Heart.jsx";
import "../../styles/product.scss";
// import { useSelector } from "react-redux";
import { useState } from "react";
import Description from "../components/product/Description.jsx";
import Sizes from "../components/product/Sizes.jsx";

const Product = ({ location, match }) => {
  const { search, state = false } = location;
  const product_id = match.params.id;

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");
  const variant = Number.parseInt(searchParams.get("variant")) || 0;

  const toRender = !state ? (
    <FetchProductDetails
      product_id={product_id}
      category={category}
      variant={variant}
    />
  ) : (
    <ProductDetails data={state} variant={variant} />
  );
  return toRender;
};

const FetchProductDetails = ({ product_id, category, variant }) => {
  const { data, loading, error } = useFetch(
    `shop/${product_id}/?category=${category}`
  );

  const toRender = loading ? (
    <Loading />
  ) : error || !data ? (
    <NotFound />
  ) : (
    <ProductDetails data={data.data} variant={variant} />
  );
  return toRender;
};

const ProductDetails = ({ data, variant = 0 }) => {
  // const { price=[], _id, title, description, images, allowed, stock, uci } = data;
  const { sizes = [], title = "", description = {}, images = [] } = data;

  // const user = useSelector((state) => state.auth.user);

  // const isUser = user._id ? true : false;
  const [selectedSize, setSelectedSize] = useState(
    variant < sizes.length ? variant : 0
  );

  const handleImageLoadError = (event) => {
    event.target.src = process.env.REACT_APP_PLACEHOLDER_IMAGE;
  };

  const updateSelected = (index) => {
    setSelectedSize((p) => index);
  };

  return (
    <section className="product">
      <div className="intro">
        <img src={images[0]} alt={title} onError={handleImageLoadError} />
        <h1>{title}</h1>
      </div>
      <Sizes
        sizes={sizes}
        updateSelected={updateSelected}
        selectedSize={selectedSize}
      />
      <Description description={description} />
    </section>
  );
};
export default Product;
