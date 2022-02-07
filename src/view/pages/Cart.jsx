import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/cart.scss";
import { addToast, addWishlist, removeCart } from "../services/actions";

const Cart = () => {
  const cart = useSelector(state => state.auth.user.cart);
  
  let toRender =
    cart.length < 1 ? (
      <CartEmpty />
    ) : (
      <CartContent data={cart} />
    );

  return toRender;
};

const CartEmpty = () => {
  return <>Cart Empty</>;
};

const CartContent = ({ data  }) => {
  return (
  <section className="cart">
    <div className="cart_list">
      {data && data.map((item) => (
        <CartItem data={item} key={item["_id"]}/>))}
    </div>
    <div className="checkout">
      <button>Checkout</button>
    </div>
  </section>
  );
}

const CartItem = ({ data }) => {
  const { _id="",title="", size="",thumbnail="", allowed=1,price:{price=0,retail_price=0}} = data;
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
  
  const addToWishlist = () => {
    dispatch(addWishlist(data));
    dispatch(addToast({ message: "Added to wishlist" }));
    dispatch(removeCart(_id))
  }

  const removeItem = () => {
    dispatch(removeCart(_id));
    dispatch(addToast({ message: "Removed from cart" })); 
  }

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

        <span className="add_to" onClick={addToWishlist}>Add to Wishlist</span>
        <span className="remove" onClick={removeItem}>Remove</span>

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
