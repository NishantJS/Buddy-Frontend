import React from "react";

const Switcher = ({ step, prevStep, nextStep, handleSubmit }) => {
  return (
    <div className="switcher">
      {step > 0 && <button onClick={prevStep}>Previous Step</button>}
      {step < 3 && <button onClick={nextStep}>Next Step</button>}
      {step === 3 && (
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default Switcher;
