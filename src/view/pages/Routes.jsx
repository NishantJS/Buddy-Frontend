import { Switch, Route } from "react-router-dom";
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
const AddProduct = lazy(() => import("../components/AddProduct.jsx"));

const Routes = () => {
  const seller = useSelector((state) => state.auth.seller);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSeller = seller._id ? true : false;
  
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/profile" component={Profile} />
        <SellerProtectedRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
          isSeller={isSeller}
        />
        <SellerProtectedRoute
          exact
          path="/add_product"
          component={AddProduct}
          isAuthenticated={isAuthenticated}
          isSeller={isSeller}
          sellerId={seller._id}
        />
        <Route exact path="/product/:id" component={Product} />
        <UserProtectedRoute
          exact
          path="/my_wishlist"
          component={Wishlist}
          isAuthenticated={isAuthenticated}
          isUser={!isSeller}
        />
        <UserProtectedRoute
          exact
          path="/my_notifications"
          component={Notification}
          isAuthenticated={isAuthenticated}
          isUser={!isSeller}
        />
        <UserProtectedRoute
          exact
          path="/my_cart"
          component={Cart}
          isAuthenticated={isAuthenticated}
          isUser={!isSeller}
        />
        <Route exact path="/categories" component={CategoryPage} />
        <Route exact path="/auth/register" component={Auth} />
        <Route exact path="/auth/login" component={Auth} />
        <Route
          exact
          path="/auth/seller_register"
          component={() => <Auth isSeller={true} />}
        />
        <Route
          exact
          path="/auth/seller_login"
          component={() => <Auth isSeller={true} />}
        />
        <Route exact path="/shop/:type" component={SubCategory} />
        <Route exact path="/shop/:type/:sub" component={Shop} />
        <Route
          exact
          path="/"
          component={isAuthenticated && isSeller ? Dashboard : Home}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
