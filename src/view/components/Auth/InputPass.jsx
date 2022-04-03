import React from "react";

const InputPass = ({
  state,
  checkValid,
  updateValue,
  method,
  isConfirmPassword = false,
}) => {
  const id = !isConfirmPassword ? "pass" : "pass1";
  const value = !isConfirmPassword
    ? { value: state.pass.value }
    : { value: state.pass1.value };
  const pass_text = !isConfirmPassword ? "Password" : "Confirm Password";

  return (
    <>
      <input
        type="password"
        id={id}
        placeholder=" "
        {...value}
        autoComplete={method === "signup" ? "new-password" : "current-password"}
        onInput={(event) => checkValid(event, id)}
        onChange={(event) => updateValue(event, id)}
        enterKeyHint={method === "signup" ? "next" : "done"}
      />
      <label htmlFor={id}>{pass_text}</label>
      <span className="error">{state[id].errors}</span>
    </>
  );
};

export default InputPass;
