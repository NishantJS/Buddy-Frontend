import { useState } from "react";
import "../../../styles/product.form.scss";
import Stepper from "./Stepper";
import Switch from "./Switch";

const ProductFormContainer = () => {
  const [step, setStep] = useState(() => 0);

  const prevStep = () => {
    if (step <= 0) return;
    setStep((p) => p - 1);
  };

  const nextStep = () => {
    if (step >= 3) return;
    setStep((p) => p + 1);
  };

  return (
    <section className="product_form">
      <Stepper step={step} />
      <Switch prevStep={prevStep} nextStep={nextStep} step={step} />
    </section>
  );
};

export default ProductFormContainer;
