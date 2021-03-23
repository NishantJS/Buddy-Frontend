import { Switch, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
////components
const Wishlist = lazy(() => import("./Wishlist"));
const Search = lazy(() => import("./Search"));
const CategoryPage = lazy(() => import("./CategoryPage"));
const Cart = lazy(() => import("./Cart"));
const Notification = lazy(() => import("./Notification"));
const Home = lazy(() => import("./Home"));
const Auth = lazy(() => import("./Auth"));
const NotFound = lazy(() => import("./NotFound"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/search" component={Search} />
        <Route exact path="/my_wishlist" component={Wishlist} />
        <Route exact path="/my_notifications" component={Notification} />
        <Route exact path="/my_cart" component={Cart} />
        <Route exact path="/categories" component={CategoryPage} />
        <Route exact path="/auth/register" component={Auth} />
        <Route exact path="/auth/login" component={Auth} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
