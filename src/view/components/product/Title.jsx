import React from "react";
import { Link } from "react-router-dom";

const Title = ({ title, seller, uci }) => {
  const getCategory = (category = parseInt((uci + "")[0])) => {
    switch (category) {
      case 1:
        return "dog";
      case 2:
        return "cat";
      default:
        return "";
    }
  };

  const getSubCategory = (sub_category = parseInt((uci + "")[2])) => {
    switch (sub_category) {
      case 0:
        return "food";
      case 1:
        return "treats";
      case 2:
        return "health";
      case 3:
        return "toys";
      case 4:
        return "grooming";
      default:
        return "";
    }
  };

  const category = getCategory();
  const sub_category = getSubCategory();

  return (
    <div className="title">
      <h5>
        <Link to="/">Home</Link> &gt; <Link to="/shop">Shop</Link> &gt;{" "}
        <Link to={`/shop/${category}`}>{category}</Link> &gt;{" "}
        <Link to={`/shop/${category}/${sub_category}`}>{sub_category}</Link>
      </h5>
      <h1>{title}</h1>
      <Link to={`/seller/${seller}`}>
        <h4>by {seller}</h4>
      </Link>
    </div>
  );
};

export default Title;
