import React from "react";
import Addresses from "./Addresses.jsx";
import SubTotal from "./SubTotal.jsx";

const Checkout = ({ data, counts = [0, 0], dispatch }) => {
  const totalAmount = data
    .map(({ sizes = {} }, index) => sizes?.price * counts[index])
    .reduce((prev, current) => prev + current);

  counts.length = data.length;

  const totalItems = counts.reduce((prev, current) => prev + current);

  return (
    <div className="checkout">
      <SubTotal totalAmount={totalAmount} totalItems={totalItems} />
      <Addresses />
    </div>
  );
};

export default Checkout;
