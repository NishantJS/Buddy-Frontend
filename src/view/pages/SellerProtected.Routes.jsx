import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({
  isSeller = false,
  isAuthenticated = false,
  component = <Navigate to="/auth/seller_login" />,
}) => {
  if (isAuthenticated && isSeller) return component;
  return <Navigate to="/auth/seller_login" />;
};

export default SellerProtectedRoute;
