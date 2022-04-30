import React from "react";
import "../../../styles/stepper.scss";

const Stepper = ({ step = 0 }) => {
  const items = ["Meta", "Sizes", "Review", "Images"];

  return (
    <ol className="stepper">
      {items.map((item, index) => {
        return (
          <li
            className={`stepper__item ${step > index ? "visited" : ""} ${
              step === index ? "current" : ""
            }`}
            data-index={index + 1}
            key={item}
          >
            <h6 className="stepper__title">{item}</h6>
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
