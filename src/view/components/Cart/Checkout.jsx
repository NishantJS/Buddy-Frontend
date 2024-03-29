import Addresses from "./Addresses";
import SubTotal from "./SubTotal";

const Checkout = ({ data, counts = [0, 0] }) => {
  const totalAmount = data
    ?.map(({ sizes = {} }, index) => sizes?.price * counts[index])
    ?.reduce((prev, current) => prev + current);

  counts.length = data.length;

  const totalItems = counts.reduce((prev, current) => prev + current);

  return (
    <div className="checkout">
      <SubTotal
        totalAmount={totalAmount}
        totalItems={totalItems}
        data={data}
        counts={counts}
      />
      <Addresses />
    </div>
  );
};

export default Checkout;
