import { useState } from "react";
import Form from "./productForm/Form.jsx";
import ProductMeta from "./productForm/ProductMeta.jsx";
import ProductDesc from "./productForm/ProductDesc.jsx";
import ProductDetails from "./productForm/ProductDetails.jsx";
import CurrentStep from "./productForm/CurrentStep.jsx";
import NextSubmit from "./productForm/NextSubmit.jsx";
import "../../styles/stepper.scss";

const AddProduct = () => {
  
  const [isValid, setValid] = useState({meta: false, desc: false, details: false, step: 2});

  // const updateValide = (field, isValid = true) => {
  //   setValid(((p) => p[field]= true );
  // }

  const steps = ["Meta","Description","Details"];

  return (
    <Form>
      <CurrentStep step={isValid.step} totalSteps={3} steps={steps} />
      <ProductMeta />
      <ProductDesc />
      <ProductDetails />
      <NextSubmit step={isValid.step} totalSteps={3} />
    </Form>
  );
}

export default AddProduct
