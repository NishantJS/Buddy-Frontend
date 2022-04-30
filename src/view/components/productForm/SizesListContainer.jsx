import React from "react";
import List from "./SizeList";

const SizesListContainer = ({ toggle, sizes, deleteSize }) => {
  return (
    <div>
      <List sizes={sizes} handler={deleteSize} />
      <button onClick={toggle}>Add Size</button>
    </div>
  );
};

export default SizesListContainer;
