import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast, addAccount } from "../../services/actions/index.js";
import InputEmail from "./InputEmail.jsx";
import InputPass from "./InputPass.jsx";

const AuthForm = ({ handler, method, isSeller = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        method !== "login" && checkValid(event, "pass1");
        break;

      case "pass1":
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

  return (
    <form className="auth_form" onSubmit={handleSubmit} noValidate>
      <InputEmail
        state={state}
        updateValue={updateValue}
        checkValid={checkValid}
      />
      <InputPass
        state={state}
        method={method}
        updateValue={updateValue}
        checkValid={checkValid}
      />
      {method !== "login" && (
        <InputPass
          state={state}
          method={method}
          updateValue={updateValue}
          checkValid={checkValid}
          isConfirmPassword={true}
        />
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
