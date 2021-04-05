import { Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../components/Loading";
////components
const Wishlist = lazy(() => import("./Wishlist"));
const Product = lazy(() => import("./Product"));
const CategoryPage = lazy(() => import("./CategoryPage"));
const Cart = lazy(() => import("./Cart"));
const Notification = lazy(() => import("./Notification"));
const Home = lazy(() => import("./Home"));
const Auth = lazy(() => import("./Auth"));
const NotFound = lazy(() => import("./NotFound"));
const SubCategory = lazy(() => import("../components/SubCategory"));
const Shop = lazy(() => import("./Shop"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Switch>
        <Route exact path="/product/:id" component={Product}/>
        <Route exact path="/my_wishlist" component={Wishlist} />
        <Route exact path="/my_notifications" component={Notification} />
        <Route exact path="/my_cart" component={Cart} />
        <Route exact path="/categories" component={CategoryPage} />
        <Route exact path="/auth/register" component={Auth} />
        <Route exact path="/auth/login" component={Auth} />
        <Route exact path="/shop/:type" component={SubCategory}/>
        <Route exact path="/shop/:type/:sub" component={Shop}/>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
