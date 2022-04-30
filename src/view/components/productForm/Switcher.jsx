import React from "react";

const Switcher = ({
  prevStep = false,
  nextStep = false,
  handleSubmit = false,
}) => {
  return (
    <div className="switcher">
      {prevStep && <button onClick={prevStep}>Previous Step</button>}
      {nextStep && <button onClick={nextStep}>Next Step</button>}
      {handleSubmit && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
};

export default Switcher;
