import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast, addAccount } from "../../services/actions/index.js";

const AuthForm = ({ handler, method, isSeller = false }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const obj = {
    value: "",
    isValid: false,
    errors: "Please fill this field",
  };
  const stateDefaults = { email: obj, pass: obj, pass1: obj };

  const [state, setState] = useState(() => stateDefaults);

  const updateValid = (field, isValid = true, errors = "wrong input") => {
    if (!field) return;

    let update = !isValid
      ? { isValid: false, errors }
      : { isValid, errors: "" };

    setState((prev) => ({ ...prev, [field]: { ...prev[field], ...update } }));
  };

  const updateValue = (event, input) => {
    setState((prev) => ({
      ...prev,
      [input]: { ...prev[input], value: event.target.value },
    }));
  };

  const checkValid = (event, field) => {
    const emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (field) {
      case "email":
        let testEmail = emailRegx.test(
          event.target.form[0].value.toLowerCase()
        );
        if (testEmail) updateValid(field);
        else updateValid(field, false, "Email is invalid");
        break;

      case "pass":
        let test = event.target.form[1].value.length <= 7;
        if (!test) updateValid(field);
        else
          updateValid(
            field,
            false,
            "Password should contain Minimum eight characters"
          );
        method !== "login" && checkValid(event, 2);
        break;

      case 2:
        let testPass1 =
          event.target.form[1].value !== event.target.form[2].value;
        if (!testPass1) updateValid("pass1");
        else updateValid("pass1", false, "Passwords are not matching!");
        break;
      default:
        break;
    }
  };

  const isValidtoSubmit = () => {
    let loginValid = state.email.isValid && state.pass.isValid;
    let signupValid = loginValid && state.pass1.isValid;
    return !(method !== "login" ? signupValid : loginValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidtoSubmit) return;

    const reqPath = method === "signup" ? "register" : "login";
    const Seller = isSeller ? "seller" : "user";

    const path = `${Seller}/${reqPath}`;
    const auth = {
      username: state.email.value,
      password: state.pass.value,
    };
    const options = { validateStatus: (status) => status < 511 };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_PROXY_URL}${path}`,
        {},
        { ...options, auth }
      );

      if (!data)
        throw new Error(
          "Connection to server failed! Please try again or later."
        );
      if (data.error)
        dispatch(addToast({ message: data.data, color: "danger" }));
      else {
        dispatch(
          addAccount({
            isSeller,
            user: data.user,
            seller: data.seller,
            message: data.data,
          })
        );
        navigate(!isSeller ? "/" : "/dashboard", { replace: true });
      }
    } catch (err) {
      dispatch(addToast({ message: err?.message, color: "danger" }));
    }
  };

  let pass1Value =
    method !== "login"
      ? { value: state.pass1.value }
      : { value: state.pass.value };

  return (
    <form className="auth_form" onSubmit={handleSubmit} noValidate>
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

      <input
        type="password"
        id="pass"
        placeholder=" "
        value={state.pass.value}
        autoComplete={method === "signup" ? "new-password" : "current-password"}
        onInput={(event) => checkValid(event, "pass")}
        onChange={(event) => updateValue(event, "pass")}
        enterKeyHint={method === "signup" ? "next" : "done"}
      />
      <label htmlFor="pass">Password</label>
      <span className="error">{state.pass.errors}</span>

      {method !== "login" ? (
        <>
          <input
            type="password"
            id="pass1"
            placeholder=" "
            autoComplete="new-password"
            {...pass1Value}
            onInput={(event) => checkValid(event, 2)}
            onChange={(event) => updateValue(event, "pass1")}
            enterKeyHint="done"
          />

          <label htmlFor="pass1">Confirm Password</label>
          <span className="error">{state.pass1.errors}</span>
        </>
      ) : (
        <></>
      )}

      <input
        type="submit"
        value={method.charAt(0).toUpperCase() + method.slice(1)}
        disabled={isValidtoSubmit()}
      />

      <p onClick={handler}>Click here for Quick {method}</p>
    </form>
  );
};

export default AuthForm;
