import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/cart.scss";
import { addToast, removeCart } from "../services/actions";

const Cart = () => {
  const user = useSelector(state => state.auth.user);
  // todo fix card to wishlist error
  let toRender = !user.cart || user.cart.length < 1 ? <CartEmpty /> : <CartContent data={user.cart} />;

  return toRender;
};

const CartEmpty = () => {
  return <>Cart Empty</>;
};

const CartContent = ({ data }) => {
  return (
  <section className="cart">
    <div className="cart_list">
      {data.map((item) => (
        <CartItem data={item} key={item["_id"]}/>))}
    </div>
    <div className="checkout">
      <button>Checkout</button>
    </div>
  </section>
  );
}

const CartItem = ({ data }) => {
  const { _id,title, size,thumbnail, allowed,price:{price,retail_price}} = data;
  const dispatch = useDispatch();

  let [count, setCount] = useState(() => 1)
  const incrementCount = () => {
    if (count < allowed) { setCount((p) => p + 1); }
    else{dispatch(addToast({message: `Only ${allowed} items per purchase are available for this product`, color: "danger"}))};  
  }

  const decrementCount = () => {
    if (count > 1) setCount((p) => p - 1);
    else { dispatch(removeCart(_id)); dispatch(addToast({message: "Product removed from Cart"}))}
  };
  
  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <span className="title">{title}</span>
        <span className="size">{size}</span>
        <div className="price">
          <span className="offer">₹{price * count}</span>

          <del>{retail_price * count}</del>
        </div>

        <span className="wishlist">Add to Wishlist</span>
      </div>

      <div className="counter">
        <button onClick={incrementCount}>+</button>
        {count}
        <button onClick={decrementCount}>-</button>
      </div>
    </div>
  );
}

export default Cart;
