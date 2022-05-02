import { memo } from "react";
import { Link } from "react-router-dom";

import { addToast } from "../../services/actions/toast";
import { removeFromCart } from "../../services/actions/user";

import { currencyFormatter } from "../../services/factories/formmater";

const CartItem = ({
  product,
  dispatch,
  handler,
  count,
  index,
  updateCount,
}) => {
  const {
    id = "",
    title = "",
    sizes: { price = 0, retail_price = 0, size = "Normal", allowed, stock },
    variant = 0,
    uci,
    seller,
  } = product;

  const urlTitle = title.split(" ").join("+");
  const imageURL = `${process.env.REACT_APP_IMAGES_PATH}${seller}/${urlTitle}0`;

  const incrementCount = () => {
    if (count >= stock) {
      dispatch(
        addToast({
          message: `Sorry! Only ${stock} items are available in stock`,
          color: "danger",
        })
      );
    } else if (count < allowed) {
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
    } else removeItem();
  };

  const removeItem = () => {
    dispatch(removeFromCart(id, variant));
  };

  return (
    <div className="list_item">
      <img src={imageURL} alt={title} />

      <div className="info">
        <Link
          to={`/product/${id}?title=${title}&category=${uci}&variant=${variant}`}
        >
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
