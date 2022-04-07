import { currencyFormatter } from "../../services/factories/formmater.js";

const SubTotal = ({ totalAmount, totalItems, handler }) => {
  const freeAbove = Number.parseInt(process.env.REACT_APP_FREE_DELIVERY_ABOVE);
  const isFreeDelivery = totalAmount > freeAbove;
  const deleiveryAmount = isFreeDelivery ? 0 : 50;
  const DeliveryMessage = isFreeDelivery
    ? "Your order is eligible for"
    : `Add an item of ${currencyFormatter(
        freeAbove - totalAmount
      )} or more to avail`;

  return totalAmount > 0 ? (
    <div className="subtotal">
      <h4>
        <span>{currencyFormatter(totalAmount)} </span>
        for {totalItems} items
      </h4>
      <h4>
        {DeliveryMessage} <span>Free Deleivery</span>
      </h4>
      {!isFreeDelivery && (
        <h5>
          <span>+ {currencyFormatter(50)}</span> Shipping
        </h5>
      )}
      <button onClick={handler}>
        Pay {currencyFormatter(totalAmount + deleiveryAmount)}
      </button>
      <ul>
        <li>Secure</li>
        <li>Easy Return</li>
        <li>24/7 Support</li>
      </ul>
    </div>
  ) : (
    <></>
  );
};

export default SubTotal;
