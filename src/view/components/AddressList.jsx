import React from "react";
import { useSelector } from "react-redux";

const AddressList = ({ isSeller }) => {
  const data = useSelector((state) => state.auth[isSeller ? "seller" : "user"]);
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
      </address>
    );
  });
};

export default AddressList;
