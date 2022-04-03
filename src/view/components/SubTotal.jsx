import { currencyFormatter } from "./../services/factories/formmater.js";

const SubTotal = ({ amount = 0, items = 0 }) => {
  const freeAbove = Number.parseInt(process.env.REACT_APP_FREE_DELIVERY_ABOVE);
  const isFreeDelivery = amount > freeAbove;
  const DeliveryMessage = isFreeDelivery
    ? "Your order is eligible for"
    : `Add an item of ${currencyFormatter(
        freeAbove - amount
      )} or more to avail`;

  return amount > 0 ? (
    <>
      <h4>
        <span>{currencyFormatter(amount)} </span>
        for {items} items
      </h4>
      <h4>
        {DeliveryMessage} <span>Free Deleivery</span>
      </h4>
      {!isFreeDelivery && (
        <h5>
          <span>+ {currencyFormatter(50)}</span> Shipping
        </h5>
      )}
    </>
  ) : (
    <></>
  );
};

export default SubTotal;
