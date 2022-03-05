const Form = ({ children }) => {
  
  const handleSubmit = async(e) => {
    e.preventDefault(); 
    console.log(e)
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  )
}

export default Form
