const Form = ({ children }) => {
  
  const handleSubmit = async(e) => {
    e.preventDefault(); 
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      {children}
    </form>
  )
}

export default Form
