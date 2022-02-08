import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function SellerProtectedRoute({ component: Component, ...restOfProps }) {
  const seller = useSelector((state) => state.auth.seller);
  const isSeller = seller._id ? true : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isSeller ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/seller_login"/>
        )
      }
    />
  );
}

export default SellerProtectedRoute;
