import { useDispatch, useSelector } from "react-redux";
import Cart from "../../../icons/Cart.jsx";
import Wishlist from "../../../icons/Heart.jsx";
import {
  addToast,
  addToCart,
  addToWishlist,
} from "../../services/actions/index.js";

const AddTo = ({ product, variant }) => {
  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const cartHandler = () => {
    const isAlreadyInCart = () => {
      return cart.some(
        (item) => item._id === product._id && item.variant === variant
      );
    };

    if (!isAlreadyInCart()) {
      dispatch(
        addToCart({ ...product, sizes: product?.sizes[variant], variant })
      );
    } else {
      dispatch(
        addToast({ message: "Product already exists in cart", color: "danger" })
      );
    }
  };

  const wishlistHandler = () => {
    const isAlreadyInWishlist = () => {
      return wishlist.some(
        (item) => item._id === product._id && item.variant === variant
      );
    };

    if (!isAlreadyInWishlist()) {
      dispatch(
        addToWishlist({ ...product, sizes: product?.sizes[variant], variant })
      );
    } else {
      dispatch(
        addToast({
          message: "Product already exists in wishlist",
          color: "danger",
        })
      );
    }
  };

  return (
    <div className="add_to">
      <button onClick={cartHandler}>
        <span>Add to cart</span> <Cart />
      </button>
      <button onClick={wishlistHandler}>
        <span>Add to wishlist</span> <Wishlist />
      </button>
    </div>
  );
};

export default AddTo;
