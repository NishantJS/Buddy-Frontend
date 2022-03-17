import Cart from "../../icons/Cart.jsx";
import Heart from "../../icons/Heart.jsx";
import {useSelector,useDispatch} from "react-redux"
import { addToast, addToCart, addToWishlist } from "../services/actions/index.js";
import { Link } from "react-router-dom";

const Slide = ({ product }) => {
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
      dispatch(addToWishlist(product));
    } else {
      toastMessage("Product already exists in Wishlist");
    }
  };

  const cartHandler = () => {
    const isAlreadyInCart = () => {
      return cart.some((item) => item._id === product._id);
    };

    if (!isAlreadyInCart()) {
      dispatch(addToCart(product));
    } else {
      toastMessage("Product already exists in cart");
    }
  };

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
          <img src={thumbnail[0]} alt={title} onError={handleImageLoadError} />
        </div>
        <div className="desc">
          <h4>{title}</h4>
          <span className="size">{size}</span>
          <div className="price">
            <span>
              <h4>{`₹ ${price[0].price}`}</h4>
              <h6>
                <del>{price[0].retail_price}</del>
              </h6>
            </span>
            <h5>{`${Math.round(
              Math.abs((price[0].price / price[0].retail_price) * 100 - 100)
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