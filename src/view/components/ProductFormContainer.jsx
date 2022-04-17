import { useState } from "react";
import "../../styles/product.form.scss";
import Description from "./productForm/Description";
import Meta from "./productForm/Meta.jsx";
import Images from "./productForm/Images.jsx";
import Review from "./productForm/Review";
import Stepper from "./productForm/Stepper";
import Switcher from "./productForm/Switcher";

const FormSwitch = ({ step }) => {
  const [title, setTitle] = useState(() => false);

  const updateTitle = (newTitle = false) => {
    setTitle(() => newTitle);
  };

  switch (step) {
    case 0:
      return <Meta updateTitle={updateTitle} />;
    case 1:
      return <Images />;
    case 2:
      return <Description />;
    case 3:
      return <Review title={title} />;

    default:
      return <Meta />;
  }
};

const ProductFormContainer = () => {
  const [step, setStep] = useState(() => 2);

  const prevStep = () => {
    if (step <= 0) return;
    setStep((p) => p - 1);
  };

  const nextStep = () => {
    if (step >= 3) return;
    setStep((p) => p + 1);
  };

  const submitData = (data) => {
    console.log(data);
  };

  return (
    <section className="product_form">
      <Stepper step={step} />
      <FormSwitch step={step} />
      <Switcher
        prevStep={prevStep}
        nextStep={nextStep}
        step={step}
        handleSubmit={submitData}
      />
    </section>
  );
};

export default ProductFormContainer;
