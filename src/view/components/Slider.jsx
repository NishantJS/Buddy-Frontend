import Cart from "../../icons/Cart";
import Heart from "../../icons/Heart";
import "../../styles/slider.scss";
import {useSelector,useDispatch} from "react-redux"
import { addToast, addToCart, addToWishlist } from "../services/actions";
import useFetch from "../../hooks/useFetch.js";
import { Link } from "react-router-dom";

const Slider = () => {
  const product = useSelector(state => state.product)
  const productSlider = (!product) ? <></> : Object.keys(product).map((key) => (<SlideContainer key={key} slide={{ sliderTitle: key, product: product[`${key}`] }} />))

  return (<>
    {productSlider}
    </>
  );
};

const SlideContainer = ({ slide }) => {
  
  const { sliderTitle } = slide;
  const { data, loading, error } = useFetch("shop/" + sliderTitle);

  return (
    <>
      <section className="slider-container">
        {!loading && !error && data.data && data.data.length>0 &&(
          <>
            <h3 className="title">shop for your {sliderTitle}</h3>
            <div className="slider">
              {data.data.map((item) => {
                return (
                    <Slide product={item} key={item._id} />);
                })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

const Slide = ({ product }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isUser = auth.user._id;

  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();
  
  const favHandler = () => {
    const isAlreadyInWishlist = () => {
      return wishlist.some((item) => item._id === product._id);
    };

    if (!isAlreadyInWishlist()) {
      dispatch(addToWishlist(product));
    } else {
      dispatch(
        addToast({
          message: "Product already exists in Wishlist",
          color: "danger",
        })
      );
    }
  }
  
  const cartHandler = () => {
    const isAlreadyInCart = () => {
      return cart.some((item)=>item._id === product._id)
    }

    if (!isAlreadyInCart()) {
      dispatch(addToCart(product));
    } else {
      dispatch(
        addToast({ message: "Product already exists in cart", color: "danger" })
      );
    }
  }

  const handleImageLoadError = (event) => {
    event.target.src = process.env.REACT_APP_PLACEHOLDER_IMAGE;
  };

  const { title, thumbnail, price, size } = product;
  
  return (
    <div className="slide" title={title}>
      <Link
        to={{
          pathname: `/product/${product._id}?title=${product.title}&category=${product.uci}`,
          state: product,
        }}
      >
        <div className="img">
          <img src={thumbnail} alt={title} onError={handleImageLoadError} />
        </div>
      </Link>
      <div className="desc">
        <h4>{title}</h4>
        <span className="size">{size}</span>
        <div className="price">
          <span>
            <h4>{`₹ ${price.price}`}</h4>
            <h6>
              <del>{price.retail_price}</del>
            </h6>
          </span>
          <h5>{`${Math.round(
            Math.abs((price.price / price.retail_price) * 100 - 100)
          )}% off`}</h5>
        </div>
      </div>
      {isAuthenticated && isUser && (
        <div className="cta">
          <Heart handler={favHandler} />
          <Cart handler={cartHandler} />
        </div>
      )}
    </div>
  );
}

export default Slider;
