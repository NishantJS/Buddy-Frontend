import React from "react";
import { removeFromAddress } from "../services/actions/auth.js";

const AddressList = ({ data, dispatch, isSeller }) => {
  const removeAddress = (id) => {
    dispatch(removeFromAddress(id, isSeller));
  };

  return data.address?.map((address) => {
    return (
      <address key={address.full_name + address?.line1}>
        <h3>
          {address?.full_name}{" "}
          {address?.isPrimary && (
            <span className="primary">Default address</span>
          )}
        </h3>
        <span>
          {address?.line1}, {address?.line2}
        </span>
        <span>
          {address?.city}, {address?.state}
        </span>
        <span>{address?.pin}</span>
        {address?.phone.join(", ")}
        <span className="delete" onClick={() => removeAddress(address._id)}>
          &#128473;
        </span>
      </address>
    );
  });
};

export default AddressList;
