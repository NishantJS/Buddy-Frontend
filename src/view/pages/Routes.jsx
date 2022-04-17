import { Routes as Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import SellerProtectedRoute from "./SellerProtected.Routes.jsx";
import UserProtectedRoute from "./UserProtected.Routes";

////components
const Wishlist = lazy(() => import("./Wishlist.jsx"));
const Settings = lazy(() => import("./Settings.jsx"));
const Product = lazy(() => import("./Product.jsx"));
const CategoryPage = lazy(() => import("./CategoryPage.jsx"));
const Cart = lazy(() => import("./Cart.jsx"));
const Notification = lazy(() => import("./Notification.jsx"));
const Home = lazy(() => import("./Home.jsx"));
const Auth = lazy(() => import("./Auth.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));
const SubCategory = lazy(() => import("../components/SubCategory.jsx"));
const Shop = lazy(() => import("./Shop.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));
const Dashboard = lazy(() => import("./Dashboard.jsx"));
const ProductFormContainer = lazy(() =>
  import("../components/ProductFormContainer.jsx")
);
const AuthTemplate = lazy(() => import("../components/auth/AuthTemplate.jsx"));

const Routes = () => {
  const seller = useSelector((state) => state.auth.seller);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSeller = seller._id ? true : false;

  const AuthTemplateGenerator = ({ paths = [] }) => {
    return paths.map((path) => (
      <Route
        path={path}
        key={path}
        element={
          <AuthTemplate
            method={
              path === "login" || path === "seller_login" ? "login" : "signup"
            }
            isSeller={path === "login" || path === "signup" ? false : true}
          />
        }
      />
    ));
  };
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          path="/"
          element={isAuthenticated && isSeller ? <Dashboard /> : <Home />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<Product />} />
        <Route
          path="/my_wishlist"
          element={
            <UserProtectedRoute
              isAuthenticated={isAuthenticated}
              isUser={!isSeller}
              component={<Wishlist />}
            />
          }
        />
        <Route
          path="/my_notifications"
          element={
            <UserProtectedRoute
              isAuthenticated={isAuthenticated}
              isUser={!isSeller}
              component={<Notification />}
            />
          }
        />
        <Route
          path="/my_cart"
          element={
            <UserProtectedRoute
              isAuthenticated={isAuthenticated}
              isUser={!isSeller}
              component={<Cart />}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute
              isAuthenticated={isAuthenticated}
              isSeller={isSeller}
              component={<Dashboard />}
            />
          }
        />
        <Route
          path="/add_product"
          element={
            <SellerProtectedRoute
              isAuthenticated={isAuthenticated}
              isSeller={isSeller}
              component={<ProductFormContainer />}
            />
          }
        />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="auth" element={<Auth />}>
          {AuthTemplateGenerator({
            paths: ["register", "login", "seller_login", "seller_register"],
          })}
        </Route>
        <Route path="/shop_for/:type" element={<SubCategory />} />
        <Route path="/shop_for/:type/:sub" element={<Shop />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
