import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/cart.scss";
import { addToast, addToWishlist, removeFromCart } from "../services/actions";
import NotFound from "../pages/NotFound.jsx";

const Cart = () => {
  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const isAlreadyInArr = (arr = [], _id) => {
    return arr.some((item) => item._id === _id);
  };

  const wishlistHandler = (product) => {
    if (!isAlreadyInArr(wishlist, product._id)) {
      dispatch(
        addToWishlist({
          ...product,
          sizes: product?.sizes[0],
          thumbnail: product?.images[0],
        })
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

  let toRender =
    cart.length < 1 ? (
      <NotFound message="Looks like your cart is empty. Try adding some products" />
    ) : (
      <CartContent data={cart} dispatch={dispatch} handler={wishlistHandler} />
    );

  return toRender;
};

const CartContent = ({ data, dispatch, handler }) => {
  return (
    <section className="cart">
      <div className="cart_list">
        {data &&
          data.map((item) => (
            <CartItem
              product={item}
              key={item["_id"]}
              dispatch={dispatch}
              handler={handler}
            />
          ))}
      </div>
      <div className="checkout">
        <button>Checkout</button>
      </div>
    </section>
  );
};

const CartItem = ({ product, dispatch, handler }) => {
  const {
    _id = "",
    title = "",
    allowed = 1,
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal" },
  } = product;

  let [count, setCount] = useState(() => 1);
  const incrementCount = () => {
    if (count < allowed) {
      setCount((p) => p + 1);
    } else {
      dispatch(
        addToast({
          message: `Only ${allowed} items per purchase are available for this product`,
          color: "danger",
        })
      );
    }
  };

  const decrementCount = () => {
    if (count > 1) setCount((p) => p - 1);
    else dispatch(removeFromCart(_id));
  };

  const removeItem = () => {
    dispatch(removeFromCart(_id));
  };

  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <span className="title">{title}</span>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">₹{price * count}</span>

          <del>{retail_price * count}</del>
        </div>

        <span className="add_to" onClick={() => handler(product)}>
          Add to Wishlist
        </span>
        <span className="remove" onClick={removeItem}>
          Remove
        </span>
      </div>

      <div className="counter">
        <button onClick={incrementCount}>+</button>
        {count}
        <button onClick={decrementCount}>-</button>
      </div>
    </div>
  );
};

export default Cart;
