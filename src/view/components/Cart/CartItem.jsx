import { memo } from "react";
import { Link } from "react-router-dom";
import { addToast, removeFromCart } from "../../services/actions/index.js";
import { currencyFormatter } from "../../services/factories/formmater.js";

const CartItem = ({
  product,
  dispatch,
  handler,
  updateCount,
  count,
  index,
}) => {
  const {
    _id = "",
    title = "",
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal", allowed, stock },
    variant = 0,
    uci,
  } = product;

  const incrementCount = () => {
    if (count < allowed && count < stock) {
      updateCount(count + 1, index);
    } else if (count >= stock) {
      dispatch(
        addToast({
          message: `Sorry! Only ${stock} items are available in stock`,
          color: "danger",
        })
      );
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
    if (count > 1) {
      updateCount(count - 1, index);
    } else removeItem();
  };

  const removeItem = () => {
    dispatch(removeFromCart(_id, variant));
  };

  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <Link to={`/product/${_id}?category=${uci}&variant=${variant}`}>
          <span className="title">{title}</span>
        </Link>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">{currencyFormatter(price * count)}</span>

          <del>{retail_price * count}</del>
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
        {count}
        <button onClick={decrementCount} aria-label="decrease quantity">
          -
        </button>
      </div>
    </div>
  );
};

export default memo(CartItem);
