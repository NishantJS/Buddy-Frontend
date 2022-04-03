import React from "react";

const InputEmail = ({ state, checkValid, updateValue }) => {
  return (
    <>
      <input
        type="email"
        id="email"
        placeholder=" "
        autoComplete="email"
        value={state.email.value}
        inputMode="email"
        onInput={(event) => checkValid(event, "email")}
        onChange={(event) => updateValue(event, "email")}
        enterKeyHint="next"
      />
      <label htmlFor="email">Email</label>
      <span className="error">{state.email.errors}</span>
    </>
  );
};

export default InputEmail;
