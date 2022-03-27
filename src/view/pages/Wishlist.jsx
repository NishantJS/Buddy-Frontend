import { useSelector, useDispatch } from "react-redux";
import "../../styles/cart.scss";
import { addToCart, removeFromWishlist, addToast } from "../services/actions";
import NotFound from "../pages/NotFound.jsx";

const Wishlist = () => {
  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const isAlreadyInArr = (arr = [], _id) => {
    return arr.some((item) => item._id === _id);
  };

  const cartHandler = (product) => {
    console.log(product);
    if (!isAlreadyInArr(cart, product._id)) {
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
              key={item["_id"]}
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
    _id = "",
    title = "",
    thumbnail = process.env.REACT_APP_PLACEHOLDER_IMAGE,
    sizes: { price = 0, retail_price = 0, size = "Normal" },
  } = product;

  const removeItem = () => {
    dispatch(removeFromWishlist(_id));
  };

  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <span className="title">{title}</span>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">₹{price}</span>
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
