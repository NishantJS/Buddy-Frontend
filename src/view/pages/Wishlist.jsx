import { useSelector ,useDispatch} from "react-redux";
import "../../styles/cart.scss";
import { addCart, removeWishlist, addToast } from "../services/actions";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  let toRender = wishlist.length < 1 ? <WishlistEmpty /> : <WishlistContent data={wishlist} />;

  return toRender;
};

const WishlistEmpty = () => {
  return <>Wishlist Empty</>;
};

const WishlistContent = ({ data }) => {
  return (
    <section className="cart">
      <div className="cart_list">
        {data && data.map((item) => (
          <WishlistItem data={item} key={item["_id"]} />
        ))}
      </div>
    </section>
  );
};

const WishlistItem = ({ data }) => {
  const {
    _id = "",
    title = "",
    size = "",
    thumbnail = "",
    price: { price = 0, retail_price = 0 },
  } = data;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addCart(data));
    dispatch(addToast({ message: "Added to cart" }));
    dispatch(removeWishlist(_id));
  };

  const removeItem = () => {
    dispatch(removeWishlist(_id));
    dispatch(addToast({ message: "Removed from wishlist" }));
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

        <span className="add_to" onClick={addToCart}>
          Add to Cart        </span>
        <span className="remove" onClick={removeItem}>
          Remove
        </span>
      </div>
    </div>
  );
};

export default Wishlist;
