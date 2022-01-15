import { useState} from "react";
import { useSelector } from "react-redux";
import "../../styles/cart.scss";

const Cart = () => {
  const cart = useSelector(state => state.auth.user.cart)
  let toRender = (!cart || cart.length < 1) ? <CartEmpty /> : <CartContent data={cart} />;

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
  const { title, size,thumbnail, allowed,price:{price,retail_price}} = data;
  
  let [count, setCount] = useState(() => 1)
  const incrementCount = () => {
  if (count < allowed) setCount((p) => p + 1);  
  }

  const decrementCount = () => {
    if (count > 1) setCount((p) => p - 1);
  };
  
  return (
    <div className="list_item">
      <img src={thumbnail} alt={title} />

      <div className="info">
        <span className="title">
          {title} {size}
        </span>

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
