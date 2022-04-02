import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({
  isSeller = false,
  isAuthenticated = false,
  children,
}) => {
  if (isAuthenticated && isSeller) return children;
  return <Navigate to="/auth/seller_login" />;
};

export default SellerProtectedRoute;
