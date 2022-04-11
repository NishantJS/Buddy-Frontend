import React from "react";

const DescriptionItems = ({ heading, value }) => {
  return (
    <div>
      <h3>{heading}</h3>
      {value}
    </div>
  );
};

export default DescriptionItems;
