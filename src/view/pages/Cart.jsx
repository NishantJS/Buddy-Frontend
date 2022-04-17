import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Loading from "./../components/Loading.jsx";
import "../../styles/cart.scss";
const CartContent = lazy(() => import("../components/cart/CartContent.jsx"));
const NotFound = lazy(() => import("./NotFound.jsx"));

const Cart = () => {
  const cart = useSelector((state) => state.auth.user.cart);

  const Render =
    cart.length < 1 ? (
      <NotFound message="Looks like your cart is empty. Try adding some products" />
    ) : (
      <CartContent data={cart} />
    );

  return <Suspense fallback={<Loading />}>{Render}</Suspense>;
};

export default Cart;
