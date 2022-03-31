import { memo } from "react";
import { addToast, removeFromCart } from "../services/actions";

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
    allowed = 1,
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal" },
    variant = 0,
  } = product;

  const incrementCount = () => {
    if (count < allowed) {
      updateCount(count + 1, index);
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
    } else dispatch(removeFromCart(_id, variant));
  };

  const removeItem = () => {
    dispatch(removeFromCart(_id, variant));
  };

  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <span className="title">{title}</span>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">
            {new Intl.NumberFormat("en", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 2,
            }).format(price * count)}
          </span>

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

export default memo(CartItem);
