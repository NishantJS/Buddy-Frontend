import Sizes from "./Sizes.jsx";
import Meta from "./Meta.jsx";
import Images from "./Images.jsx";
import Review from "./Review";
import { useState } from "react";

const Switch = ({ step, nextStep, prevStep }) => {
  const [state, setState] = useState({
    meta: {
      title: "",
      description: "",
      category: "",
      sub_category: "",
    },
    sizes: [],
  });

  const updateState = (data, key) => {
    setState((prev) => {
      return { ...prev, [key]: data };
    });
  };

  switch (step) {
    case 0:
      return (
        <Meta nextStep={nextStep} data={state.meta} updateMeta={updateState} />
      );
    case 1:
      return (
        <Sizes
          prevStep={prevStep}
          nextStep={nextStep}
          data={state.sizes}
          updateSizes={updateState}
        />
      );
    case 2:
      return <Review prevStep={prevStep} nextStep={nextStep} data={state} />;
    case 3:
      return <Images prevStep={prevStep} state={state} />;

    default:
      return <Meta nextStep={nextStep} />;
  }
};

export default Switch;
