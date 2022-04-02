import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({
  isUser = false,
  isAuthenticated = false,
  component = <Navigate to="/auth/login" />,
}) => {
  if (isAuthenticated && isUser) return component;
  return <Navigate to="/auth/login" />;
};

export default UserProtectedRoute;
