import { useState } from "react";

const ProductMeta = () => {
  const [state, setState] = useState({ value: "", error: "" });

  // const validate = (value) => {
  //   console.log(value)
  //   value.
  // }

  const changeValue = (e) => {
    // validate(e.target.value);
    
    setState(p=>({...p, value: e.target.value }));
  }
  
  return (
    <div>
      <label htmlFor="title">Product Title</label>
      <input type="text" name="title" value={state.value} onChange={ changeValue}/>
      <span className="error">{state.error && state.error}</span>
    </div>
  )
}

export default ProductMeta;
