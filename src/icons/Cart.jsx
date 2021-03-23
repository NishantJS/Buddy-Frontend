import { useState } from "react";
import { connect } from "react-redux";
import { addCart } from "../view/services/actions/";

const Cart = ({ data, dispatch }) => {
  const [isActive, setActive] = useState(() => false);
  const addToCart = (data) => {
    let id = data && `${data.title} ${data.price.price}`;
    data && dispatch(addCart(data, id));
    setActive((p) => !p);
  };
  return (
    <svg
      onClick={() => addToCart(data)}
      xmlns="http://www.w3.org/2000/svg"
      className={`bag ${isActive ? "active" : ""}`}
      width="30"
      height="30"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="9" cy="19" r="2" />
      <circle cx="17" cy="19" r="2" />
      <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
    </svg>
  );
};

export default connect()(Cart);
