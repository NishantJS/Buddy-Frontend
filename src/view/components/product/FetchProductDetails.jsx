import NotFound from "../../pages/NotFound";
import Loading from "../Loading";
import ProductDetails from "./ProductDetails";
import useFetch from "../../../hooks/useFetch.js";

const FetchProductDetails = ({ search, pathname }) => {
  const product_id = pathname.split("/")[2] || 0;
  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");
  const variant = Number.parseInt(searchParams.get("variant")) || 0;

  const { data, loading, error } = useFetch(
    `shop/${product_id}?category=${category}`
  );
  console.log({ data, loading, error });

  const toRender = loading ? (
    <Loading />
  ) : error || !data ? (
    <NotFound />
  ) : (
    <ProductDetails data={data.data} variant={variant} />
  );
  return toRender;
};

export default FetchProductDetails;
