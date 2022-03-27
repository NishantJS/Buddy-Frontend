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
import Images from "../components/product/Images.jsx";

const Product = ({ location, match }) => {
  const { search, state = false } = location;

  const toRender = !state ? (
    <FetchProductDetails search={search} match={match} />
  ) : (
    <ProductDetails data={state} variant={state?.variant || 0} />
  );
  return toRender;
};

const FetchProductDetails = ({ search, match }) => {
  const product_id = match.params.id;
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");
  const variant = Number.parseInt(searchParams.get("variant")) || 0;

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
      <Images images={images} title={title} />
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
