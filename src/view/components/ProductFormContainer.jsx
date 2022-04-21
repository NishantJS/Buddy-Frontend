import { useState } from "react";
import "../../styles/product.form.scss";
import Description from "./productForm/Description";
import Meta from "./productForm/Meta.jsx";
import Images from "./productForm/Images.jsx";
import Review from "./productForm/Review";
import Stepper from "./productForm/Stepper";

const FormSwitch = ({ step, nextStep, prevStep }) => {
  const [title, setTitle] = useState(() => false);

  const updateTitle = (newTitle = false) => {
    setTitle(() => newTitle);
  };

  switch (step) {
    case 0:
      return <Meta updateTitle={updateTitle} nextStep={nextStep} />;
    case 1:
      return <Images prevStep={prevStep} nextStep={nextStep} title={title} />;
    case 2:
      return <Description prevStep={prevStep} nextStep={nextStep} />;
    case 3:
      return <Review title={title} prevStep={prevStep} />;

    default:
      return <Meta updateTitle={updateTitle} nextStep={nextStep} />;
  }
};

const ProductFormContainer = () => {
  const [step, setStep] = useState(() => 1);

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
      <FormSwitch prevStep={prevStep} nextStep={nextStep} step={step} />
    </section>
  );
};

export default ProductFormContainer;
