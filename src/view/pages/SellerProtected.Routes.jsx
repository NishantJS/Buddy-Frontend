import { Redirect, Route } from "react-router-dom";

function SellerProtectedRoute({ component: Component, isSeller = false, isAuthenticated = false,...restOfProps }) {

  let prop = restOfProps?.sellerId ? { sellerId: restOfProps.sellerId } : {};
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && isSeller ? (
          <Component {...props} {...prop}/>
        ) : (
          <Redirect to="/auth/seller_login"/>
        )
      }
    />
  );
}

export default SellerProtectedRoute;
