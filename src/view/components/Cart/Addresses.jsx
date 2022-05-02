import { useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import EmptyAddress from "./EmptyAddress";

const Addresses = () => {
  const address = useSelector((state) => state.auth.user.address);

  const toRender =
    address.length < 1 ? (
      <EmptyAddress />
    ) : (
      <>
        <SelectAddress addresses={address} />
        <Link to="/profile#address">
          <h5>or add another...</h5>
        </Link>
      </>
    );
  return <div className="addresses">{toRender}</div>;
};

export default Addresses;

const Address = ({ address, index }) => {
  const {
    full_name = "",
    phone = [],
    isPrimary = false,
    line1,
    line2,
    pin,
    state,
    isHome = true,
  } = address;

  const [isChecked, setChecked] = useState();
  const updateChecked = (e) => {
    setChecked(e?.target?.checked || false);
  };

  return (
    <article>
      <label>
        <input
          type="radio"
          name="isSelectedAddress"
          defaultChecked={isPrimary}
          value={index}
          onChange={(e) => updateChecked(e)}
        />
        <span
          className="checkmark"
          role={"checkbox"}
          aria-checked={isChecked}
          tabIndex={0}
          aria-label="Select this Address"
        ></span>
      </label>
      <address>
        <div>
          <h4>{full_name}</h4>
          <h4>{phone[0]}</h4>
        </div>
        {line1 + ", " + line2}
        <br />
        {state + " " + pin}
        <br />
        <span>{isHome ? "Home" : "Work"}</span>
      </address>
    </article>
  );
};

const SelectAddress = ({ addresses = [] }) => {
  return addresses.map((address, index) => (
    <Address address={address} key={index} index={index} />
  ));
};
