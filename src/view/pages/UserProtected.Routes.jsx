import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function UserProtectedRoute({ component: Component, ...restOfProps }) {
  const user = useSelector((state) => state.auth.user);
  const isUser = user._id ? true : false;
  
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
}

export default UserProtectedRoute;
