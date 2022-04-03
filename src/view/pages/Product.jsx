import "../../styles/product.scss";
import { useLocation } from "react-router-dom";
import FetchProductDetails from "../components/product/FetchProductDetails.jsx";
import ProductDetails from "../components/product/ProductDetails.jsx";

const Product = () => {
  const location = useLocation();
  const { state = false, search, pathname } = location;

  const toRender = !state ? (
    <FetchProductDetails search={search} pathname={pathname} />
  ) : (
    <ProductDetails data={state} variant={state?.variant} />
  );
  return toRender;
};

export default Product;
