import React from "react";
import Addresses from "./Addresses.jsx";
import SubTotal from "./SubTotal.jsx";

const Checkout = ({ data, counts = [0, 0] }) => {
  const totalAmount = data
    .map(({ sizes = {} }, index) => sizes?.price * counts[index])
    .reduce((prev, current) => prev + current);
  counts.length = data.length;
  const totalItems = counts.reduce((prev, current) => prev + current);

  const checkoutHandler = () => {
    const getIndex = () => {
      const isSelected = document.getElementsByName("isSelectedAddress");
      if (!isSelected) return 0;
      for (let index = 0; index < isSelected.length; index++) {
        if (isSelected[index].checked) return index;
      }
    };
    alert(totalAmount + " " + totalItems + " " + getIndex());
  };

  return (
    <div className="checkout">
      <SubTotal
        totalAmount={totalAmount}
        totalItems={totalItems}
        handler={checkoutHandler}
      />
      <Addresses />
    </div>
  );
};

export default Checkout;
