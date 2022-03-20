import useFetch from "../../hooks/useFetch.js";
import NotFound from "./NotFound.jsx";
import Loading from "../components/Loading.jsx"
import Cart from "../../icons/Cart.jsx";
import Heart from "../../icons/Heart.jsx";
import "../../styles/product.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

const Product = ({ location, match }) => {
  const { search, state=false } = location;
  const product_id = match.params.id;

  const searchParams = new URLSearchParams(search);
  const category = searchParams.get("category");

  const toRender = !state ? <FetchProductDetails product_id={product_id} category={category} /> : <ProductDetails data={state} />;
  return toRender;
};

const FetchProductDetails = ({ product_id, category }) => {
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
  const { price=[], _id, title, description, images, allowed, stock, uci } = data;

  const user = useSelector((state) => state.auth.user);

  const isUser = user._id ? true : false;
  
  const [selectedSize, setSelectedSize] = useState(0);

  const handleImageLoadError = (event) => {
    event.target.src =
      process.env.REACT_APP_PLACEHOLDER_IMAGE;
  }

  const updateSelected = (index) => {
    setSelectedSize(p=>index)
  }

  return (
    <section className="product">
      <div className="intro">
        <img src={images[0]} alt={title} onError={handleImageLoadError} />
        <h1>{title}</h1>
      </div>
      <div className="size">
        {price.map((element, index) => {
          return (
            element?.price && (
              <div
                className={`box${selectedSize === index ? " selected" : ""}`}
                onClick={() => updateSelected(index)}
                key={index + element?.price}
              >
                <span className="name">{element.size || index + 1}</span>
                <span className="price">₹ {element.price}</span>
              </div>
            )
          );
        })}
      </div>
      <div className="desc">
        <span>{description?.main}</span>
        {description?.feeding_guide && (
          <table border={1} style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th colSpan={2}>Feeding guide</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(description.feeding_guide).map((ele, index) => (
                <tr key={ele + index}>
                  <th>{ele}</th>
                  <td>{description.feeding_guide[ele]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        price: {price[selectedSize].price}-{price[selectedSize].retail_price}
        -allowed: {allowed}- stock:
        {stock}- id: {_id}- uci:{uci}
      </div>
    </section>
  );
}
export default Product
