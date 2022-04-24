import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../services/actions/user";
import { addToast } from "../../services/actions/toast";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const CartContent = ({ data }) => {
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const isAlreadyInArr = (arr = [], id, variant) => {
    return arr.some((item) => item.id === id && item.variant === variant);
  };

  const wishlistHandler = (product) => {
    if (!isAlreadyInArr(wishlist, product.id, product.variant)) {
      dispatch(addToWishlist(product));
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
    <section className="cart">
      <div className="cart_list">
        {data &&
          data.map((item) => (
            <CartItem
              product={item}
              key={item["id"] + item["variant"]}
              dispatch={dispatch}
              handler={wishlistHandler}
            />
          ))}
      </div>
      <Checkout data={data} />
    </section>
  );
};

export default CartContent;
