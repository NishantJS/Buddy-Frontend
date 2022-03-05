const CurrentStep = ({ step, totalSteps, steps }) => {
  return (
    <div className="stepper-wrapper">
      {steps.map((v,i) => (
        <div className={`stepper-item ${step>i?"completed":""} ${step===i? "active":""}`} key={i}>
          <div className="step-counter">{i+1}</div>
          <div className="step-name">{v}</div>
        </div>))
      }
    </div>
  );
}

export default CurrentStep
