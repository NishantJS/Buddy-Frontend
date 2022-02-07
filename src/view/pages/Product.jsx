import useFetch from "../../hooks/useFetch.js";
import NotFound from "./NotFound.jsx";
import Loading from "../components/Loading.jsx"
import Cart from "../../icons/Cart.jsx";
import Heart from "../../icons/Heart.jsx";
import "../../styles/product.scss";
import { useSelector } from "react-redux";

const Product = ({ location, match }) => {
  const { search, state=0 } = location;
  const product_id = match.params.id;

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");

  const toRender = !state ? <FetchProductDetails product_id={product_id} category={category} /> : <ProductDetails data={state} />;
  return toRender;
};

const FetchProductDetails = ({ product_id, category }) => {
  console.log("In fetch")
  const { data, loading, error } = useFetch(
    `shop/${product_id}/?category=${category}`
  );

  const toRender = loading ? (
    <Loading />
  ) : error || !data ? (
    <NotFound />
  ) : (
    <ProductDetails data={data.data} />
  );
  return toRender;
}

const ProductDetails = ({ data }) => {
  const { price, _id, title, description, thumbnail, allowed, stock, size, uci } = data;

  const user = useSelector((state) => state.auth.user);

  const isUser = user._id? true: false;

  const handleImageLoadError = (event) => {
    event.target.src =
      process.env.REACT_APP_PLACEHOLDER_IMAGE;
  }

  return (
    <section className="product">
      <div className="intro">
        <img src={thumbnail} alt={title} onError={handleImageLoadError}/>
      <h1>{title}</h1>
        {isUser&& <div className="add_to">
          <span>
            Add to Cart <Cart />
          </span>

          <span>
            Add to Wishlist <Heart />
          </span>
        </div>}
      </div>
      <div className="desc">
        <p>{description}</p>
      </div>
    </section>
  );
}
export default Product
