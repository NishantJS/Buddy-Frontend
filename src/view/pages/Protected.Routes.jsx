import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isSeller = false,
  isAuthenticated = false,
  component = <Navigate to="/auth/seller_login" />,
}) => {
  if (isAuthenticated) return component;
  return <Navigate to={`/auth/${isSeller ? "seller_login" : "login"}`} />;
};

export default ProtectedRoute;
