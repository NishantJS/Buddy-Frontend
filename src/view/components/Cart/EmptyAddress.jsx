import { Link } from "react-router-dom";

const EmptyAddress = () => {
  return (
    <Link to="/profile#address">
      <h4>Add Address</h4>
      <h5>Please add an address to continue</h5>
    </Link>
  );
};

export default EmptyAddress;
