import Cart from "../../icons/Cart.jsx";
import Heart from "../../icons/Heart.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  addToast,
  addToCart,
  addToWishlist,
} from "../services/actions/index.js";
import { Link } from "react-router-dom";

const Slide = ({ product, variant }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const isUser = auth.user._id;

  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const toastMessage = (message = "", color = "danger") => {
    dispatch(
      addToast({
        message: message,
        color: color,
      })
    );
  };

  const favHandler = () => {
    const isAlreadyInWishlist = () => {
      return wishlist.some((item) => item._id === product._id);
    };

    if (!isAlreadyInWishlist()) {
      dispatch(addToWishlist({ ...product, sizes: product?.currentSize }));
    } else {
      toastMessage("Product already exists in Wishlist");
    }
  };

  const cartHandler = () => {
    const isAlreadyInCart = () => {
      return cart.some((item) => item._id === product._id);
    };

    if (!isAlreadyInCart()) {
      dispatch(addToCart({ ...product, sizes: product?.currentSize }));
    } else {
      toastMessage("Product already exists in cart");
    }
  };

  const handleImageLoadError = (event) => {
    event.target.src = process.env.REACT_APP_PLACEHOLDER_IMAGE;
  };

  const { title = "", images = [], currentSize = {}, _id, uci = 0 } = product;
  const urlTitle = title.split(" ").join("_");

  return (
    <div className="slide" title={title}>
      <Link
        to={{
          pathname: `/product/${_id}?title=${urlTitle}&category=${uci}&variant=${
            variant || 0
          }`,
          state: { ...product, variant },
        }}
      >
        <div className="img">
          <img src={images[0]} alt={title} onError={handleImageLoadError} />
        </div>
        <div className="desc">
          <span className="size">{currentSize.size || "Normal"}</span>
          <h4>{title}</h4>
          <div className="price">
            <span>
              <h4>{`₹ ${currentSize.price}`}</h4>
              <h6>
                <del>{currentSize.retail_price}</del>
              </h6>
            </span>
            <h5>{`${Math.round(
              Math.abs(
                (currentSize?.price / currentSize?.retail_price) * 100 - 100
              )
            )}% off`}</h5>
          </div>
        </div>
      </Link>
      <div className="cta">
        <Heart
          handler={() =>
            isAuthenticated && isUser
              ? favHandler()
              : toastMessage("Please log in to add to wishlist")
          }
        />
        <Cart
          handler={() =>
            isAuthenticated && isUser
              ? cartHandler()
              : toastMessage("Please log in to add to cart")
          }
        />
      </div>
    </div>
  );
};

export default Slide;
