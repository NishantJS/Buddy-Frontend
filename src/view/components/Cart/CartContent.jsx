import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../services/actions/user";
import { addToast } from "../../services/actions/toast";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";

const CartContent = ({ data }) => {
  const [counts, setCounts] = useState(() => data?.map(() => 1));

  const updateCounts = (child_count, index) => {
    setCounts((prev) => {
      let arr = prev;
      arr[index] = child_count;
      return [...arr];
    });
  };

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
          data?.map((item, index) => (
            <CartItem
              product={item}
              key={item["id"] + item["variant"]}
              dispatch={dispatch}
              handler={wishlistHandler}
              index={index}
              count={counts[index]}
              updateCount={updateCounts}
            />
          ))}
      </div>
      <Checkout data={data} counts={counts} />
    </section>
  );
};

export default CartContent;
