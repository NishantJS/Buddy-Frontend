const NextSubmit = ({step, totalSteps }) => {
  return (
    <div>
      Next
      {step > 0 && <input type="button" value="prev"/>}
      {step < totalSteps-1 && <input type="button" value="next"/>}
      {step === totalSteps-1 && <input type="submit" value="submit"/>}
    </div>
  )
}

export default NextSubmit
