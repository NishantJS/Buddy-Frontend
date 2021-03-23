import { connect } from "react-redux";

const Cart = ({ cart }) => {
  console.log(cart);
  let toRender =
    cart && cart.length < 1 ? <CartEmpty /> : <CartContent data={cart} />;

  return toRender;
};

const CartEmpty = () => {
  return <h1>Nishant</h1>;
};

const CartContent = ({ data }) => {
  return (
    <>
      {data.map((item) => {
        let {
          item: {
            brand: { seller_name },
            price: { price, retail_price },
            thumbnail,
            title,
          },
          id,
        } = item;

        console.log(item);

        return (
          <section key={id}>
            <picture>
              <img src={thumbnail} alt={title} />
            </picture>
            <div className="desc">
              <h3>{title}</h3>
              <h4>{price}</h4>
              <h5>{retail_price}</h5>
              <h6>{seller_name}</h6>
            </div>
          </section>
        );
      })}
    </>
  );
};

const cartData = (state) => ({
  cart: state.cart.data,
});

export default connect(cartData)(Cart);
