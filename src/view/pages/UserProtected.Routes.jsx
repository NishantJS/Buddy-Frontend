import { Redirect, Route } from "react-router-dom";

function UserProtectedRoute({ component: Component, isUser = false, isAuthenticated = false, ...restOfProps }) {
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && isUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default UserProtectedRoute;
