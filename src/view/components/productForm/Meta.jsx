import React from "react";
import Switcher from "./Switcher";

const Meta = ({ updateTitle, nextStep, step }) => {
  return (
    <>
      <label>
        <input type="text" />
      </label>
      <Switcher nextStep={nextStep} step={step} />
    </>
  );
};

export default Meta;
