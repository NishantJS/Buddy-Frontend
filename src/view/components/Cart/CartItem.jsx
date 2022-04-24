import { memo } from "react";
import { Link } from "react-router-dom";
import { addToast } from "../../services/actions/toast";
import { removeFromCart, updateQuantity } from "../../services/actions/user";
import { currencyFormatter } from "../../services/factories/formmater";

const CartItem = ({ product, dispatch, handler }) => {
  const {
    id = "",
    title = "",
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal", allowed, stock },
    variant = 0,
    uci,
    quantity = 1,
  } = product;

  const incrementCount = () => {
    if (quantity >= stock) {
      dispatch(
        addToast({
          message: `Sorry! Only ${stock} items are available in stock`,
          color: "danger",
        })
      );
    } else if (quantity < allowed) {
      dispatch(updateQuantity(id, variant, true));
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
    if (quantity > 1) {
      dispatch(updateQuantity(id, variant, false));
    } else removeItem();
  };

  const removeItem = () => {
    dispatch(removeFromCart(id, variant));
  };

  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <Link
          to={`/product/${id}?title=${title}&category=${uci}&variant=${variant}`}
        >
          <span className="title">{title}</span>
        </Link>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">{currencyFormatter(price * quantity)}</span>

          <del>{retail_price * quantity}</del>
        </div>

        <span
          className="add_to"
          onClick={() => handler(product)}
          role={"button"}
        >
          Add to Wishlist
        </span>
        <span className="remove" onClick={removeItem} role={"button"}>
          Remove
        </span>
      </div>

      <div className="counter">
        <button onClick={incrementCount} aria-label="add quantity">
          +
        </button>
        {quantity}
        <button onClick={decrementCount} aria-label="decrease quantity">
          -
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
