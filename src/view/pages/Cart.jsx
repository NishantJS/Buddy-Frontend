import { useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToast, addToWishlist } from "../services/actions";
import Loading from "./../components/Loading.jsx";
import SubTotal from "../components/SubTotal";
import "../../styles/cart.scss";
const CartItem = lazy(() => import("./../components/CartItem.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));

const Cart = () => {
  const cart = useSelector((state) => state.auth.user.cart);
  const wishlist = useSelector((state) => state.auth.user.wishlist);

  const dispatch = useDispatch();

  const isAlreadyInArr = (arr = [], _id, variant) => {
    return arr.some((item) => item._id === _id && item.variant === variant);
  };

  const wishlistHandler = (product) => {
    if (!isAlreadyInArr(wishlist, product._id, product.variant)) {
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

  let Render =
    cart.length < 1 ? (
      <NotFound message="Looks like your cart is empty. Try adding some products" />
    ) : (
      <CartContent data={cart} dispatch={dispatch} handler={wishlistHandler} />
    );

  return <Suspense fallback={<Loading />}>{Render}</Suspense>;
};

const CartContent = ({ data, dispatch, handler }) => {
  const [counts, setCounts] = useState(() => data.map(() => 1));
  const [total, setTotal] = useState(() =>
    data
      .map(({ sizes = {} }) => sizes?.price)
      .reduce((prev, current) => prev + current)
  );

  const updateCounts = (child_count, index) => {
    setCounts((prev) => {
      let arr = prev;
      arr[index] = child_count;
      return [...arr];
    });
    setTotal(() => calculateAmount("price"));
  };

  const calculateAmount = () => {
    return data
      ?.map(({ sizes = {} }, index) => sizes?.price * counts[index])
      ?.reduce((prev, current) => prev + current);
  };

  return (
    <section className="cart">
      <div className="cart_list">
        {data &&
          data.map((item, index) => (
            <CartItem
              product={item}
              key={item["_id"] + item["variant"]}
              dispatch={dispatch}
              handler={handler}
              index={index}
              count={counts[index]}
              updateCount={updateCounts}
            />
          ))}
      </div>
      <div className="checkout">
        <SubTotal amount={total} items={data?.length} />
      </div>
    </section>
  );
};

export default Cart;
