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
      {handleSubmit && (
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default Switcher;
