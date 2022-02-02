import { useSelector ,useDispatch} from "react-redux";
import "../../styles/cart.scss";
import { addCart, removeWishlist } from "../services/actions";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.auth.user.wishlist);
  let toRender =
    !wishlist || wishlist.length < 1 ? <WishlistEmpty /> : <WishlistContent data={wishlist} />;

  return toRender;
};

const WishlistEmpty = () => {
  return <>Wishlist Empty</>;
};

const WishlistContent = ({ data }) => {
  return (
    <section className="cart">
      <div className="cart_list">
        {data.map((item) => (
          <WishlistItem data={item} key={item["_id"]} />
        ))}
      </div>
    </section>
  );
};

const WishlistItem = ({ data }) => {
  const {
    _id,
    title,
    size,
    thumbnail,
    price: { price, retail_price },
  } = data;
  const dispatch = useDispatch();

  const moveToCart = () => {
    dispatch(removeWishlist(_id))
    dispatch(addCart(data))
  }

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

        <span className="wishlist" onClick={moveToCart}>
          Add to Cart
        </span>
      </div>
    </div>
  );
};

export default Wishlist;
