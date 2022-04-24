import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromWishlist } from "../services/actions/user";
import { addToast } from "../services/actions/toast";
import "../../styles/cart.scss";
import NotFound from "../pages/NotFound";

const Wishlist = () => {
  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const isAlreadyInArr = (arr = [], id, variant) => {
    return arr.some((item) => item.id === id && item.variant === variant);
  };

  const cartHandler = (product) => {
    if (!isAlreadyInArr(cart, product.id, product.variant)) {
      dispatch(addToCart(product));
    } else {
      dispatch(
        addToast({
          message: "Product already exists in cart",
          color: "danger",
        })
      );
    }
  };

  let toRender =
    wishlist.length < 1 ? (
      <NotFound message="Looks like your wishlist is empty. Try adding some products" />
    ) : (
      <WishlistContent
        data={wishlist}
        dispatch={dispatch}
        handler={cartHandler}
      />
    );

  return toRender;
};

const WishlistContent = ({ data, dispatch, handler }) => {
  return (
    <section className="cart">
      <div className="cart_list">
        {data &&
          data.map((item) => (
            <WishlistItem
              product={item}
              key={item["id"] + item["variant"]}
              dispatch={dispatch}
              handler={handler}
            />
          ))}
      </div>
    </section>
  );
};

const WishlistItem = ({ product, dispatch, handler }) => {
  const {
    id = "",
    title = "",
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal" },
    variant = 0,
  } = product;

  const removeItem = () => {
    dispatch(removeFromWishlist(id, variant));
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
            }).format(price)}
          </span>
          <del>{retail_price}</del>
        </div>

        <span className="add_to" onClick={() => handler(product)}>
          Add to Cart
        </span>
        <span className="remove" onClick={removeItem}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default Wishlist;
