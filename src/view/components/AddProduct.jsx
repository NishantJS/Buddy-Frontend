import { useState } from "react";

const AddProduct = () => {
const [state, setState] = useState({ title: "", description: "", price: {price: 0, retail_price: 0}, allowed:0, stock: 0, size: "", uci: 100, thumbnail: [""] });
  
const [error, setError] = useState({
  title: true,
  description: true,
  price: { price: true, retail_price: true },
  allowed: true,
  stock: true,
  size: true,
  uci: true,
  thumbnail: true,
});
  const handleSubmit = () => { };

  const checkValid = () => {};

  const updateValue = () => {};

  return (
    <form className="product_form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        id="title"
        placeholder=""
        value={state.title}
        onInput={(event) => checkValid(event, 0)}
        onChange={(event) => updateValue(event, 0)}
      />
      <label htmlFor="title">Title</label>
      <span className="error">{error.title}</span>

      <input
        type="submit"
        value={"Submit"}
        disabled={
          !error.title
            ? false
            : true
        }
      />
    </form>
  );
}

export default AddProduct
