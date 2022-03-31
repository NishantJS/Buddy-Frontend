import { currencyFormatter } from "./../services/factories/formmater.js";

const SubTotal = ({ amount = 0, items = 0 }) => {
  const freeAbove = Number.parseInt(process.env.REACT_APP_FREE_DELIVERY_ABOVE);
  const isFreeDelivery = amount > freeAbove;
  const DeliveryMessage = isFreeDelivery
    ? "Your order is eligible for FREE Delivery."
    : `Add an item of ${currencyFormatter(
        freeAbove - amount
      )} or more to avail FREE Delivery.`;

  return amount > 0 ? (
    <div>
      <h4>
        <span>{currencyFormatter(amount)}</span>
        for {items} items
      </h4>
      <h4>{DeliveryMessage}</h4>
    </div>
  ) : (
    <></>
  );
};

export default SubTotal;
