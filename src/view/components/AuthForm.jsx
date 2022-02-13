import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { addUser, addToast, addSeller } from "../services/actions";
import {useHistory} from "react-router-dom"
import setAuthToken from "../services/factories/setAuthToken.js";

const AuthForm = ({ handler, method, isSeller = false}) => {
  const dispatch = useDispatch();
  let history =useHistory()
  const stateDefaults = {
    email: {
      value: "",
      isValid: false,
      errors: "",
    },
    pass: {
      value: "",
      isValid: false,
      errors: "",
    },
    pass1: {
      value: "",
      isValid: false,
      errors: "",
    },
  };
  
  const [state, setState] = useState(() => stateDefaults);
  
  const updateValue = (event, input) => {
    let value = event.target.value;

    switch (input) {
      case 0:
        setState((prev) => ({ ...prev, email: { ...prev.email, value } }));
        break;
      case 1:
        setState((prev) => ({ ...prev, pass: { ...prev.pass, value } }));
        break;
      case 2:
        setState((prev) => ({ ...prev, pass1: { ...prev.pass1, value } }));
        break;
      default:
        break;
    }
  };

  const checkValid = (event, index) => {
    const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    switch (index) {
      case 0:
        let testEmail = emailRegx.test(
          event.target.form[0].value.toLowerCase()
        );

        if (testEmail) {
          setState((prev) => ({
            ...prev,
            email: { ...prev.email, isValid: true, errors: "" },
          }));
        } else {
          setState((prev) => ({
            ...prev,
            email: {
              ...prev.email,
              isValid: false,
              errors: "Email is invalid",
            },
          }));
        }

        break;
      case 1:
        let testPass = event.target.form[1].value.length <= 7;

        if (!testPass) {
          if (method === "login") {
            setState((prev) => ({
              ...prev,
              pass1: { ...prev.pass1, isValid: true },
              pass: { ...prev.pass, isValid: true, errors: "" },
            }));
          } else {
            setState((prev) => ({
              ...prev,
              pass: { ...prev.pass, isValid: true, errors: "" },
            }));
          }
            
        } else {
          setState((prev) => ({
            ...prev,
            pass: {
              ...prev.pass,
              isValid: false,
              errors: "Password should contain Minimum eight characters",
            },
          }));
        }
        checkValid(2);
        break;
      case 2:
        if (method === "signup") {  
        let testPass1 =
            event.target.form[1].value === event.target.form[2].value;

          if (testPass1) {
            setState((prev) => ({
              ...prev,
              pass1: { ...prev.pass1, isValid: true, errors: "" },
            }));
          } else {
            setState((prev) => ({
              ...prev,
              pass1: {
                ...prev.pass1,
                isValid: false,
                errors: "Passwords are not matching",
              },
            }));
          }
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqPath = method === "signup" ? "register" : "login";
    const Seller = isSeller ? "seller" : "user";

    const path = `${process.env.REACT_APP_ROOT_PATH}${Seller}/${reqPath}`;
    const validateStatus = { validateStatus: (status) => status < 511 };
    
    const bodyData = {
      email: state.email.value,
      pass: state.pass.value,
    }

    try {
      const { data } = await axios.post(path, bodyData, validateStatus);
      
      if (!data) throw new Error("Something Went Wrong!");
      if (data.error) dispatch(addToast({ message: data.data, color: "danger" }));
      else {
        setAuthToken(data.token);

        if (!isSeller) {
          dispatch(addToast({ message: data.data }));
          dispatch(addUser(data.user));
          localStorage.removeItem("seller");
          localStorage.removeItem("jwt_seller");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          history.replace("/");
        } else {
          dispatch(addToast({ message: data.data }));
          dispatch(addSeller(data.seller));
          localStorage.removeItem("user");
          localStorage.removeItem("jwt");
          localStorage.setItem("jwt_seller", data.token);
          localStorage.setItem("seller", JSON.stringify(data.seller));
          history.replace("/dashboard");
        }
      }
    } catch (err) { dispatch(addToast({ message: err?.message, color: "danger" })); };
  };

  let pass1Value =
    method === "signup"
      ? { value: state.pass1.value }
      : { value: state.pass.value };
  
  return (
    <form className="auth_form" onSubmit={handleSubmit} noValidate>
      <input
        type="email"
        id="email"
        placeholder=""
        value={state.email.value}
        onInput={(event) => checkValid(event, 0)}
        onChange={(event) => updateValue(event, 0)}
      />
      <label htmlFor="email">Email</label>
      <span className="error">{state.email.errors}</span>

      <input
        type="password"
        id="pass"
        placeholder=""
        value={state.pass.value}
        autoComplete="true"
        onInput={(event) => checkValid(event, 1)}
        onChange={(event) => updateValue(event, 1)}
      />
      <label htmlFor="pass">Password</label>
      <span className="error">{state.pass.errors}</span>

      {method === "signup" ? (
        <>
          <input
            type="password"
            id="pass1"
            placeholder=""
            autoComplete="false"
            {...pass1Value}
            onInput={(event) => checkValid(event, 2)}
            onChange={(event) => updateValue(event, 2)}
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
        disabled={
          state.email.isValid && state.pass.isValid && state.pass1.isValid
            ? false
            : true
        }
      />

      <p onClick={handler}>Click here for Quick {method}</p>
    </form>
  );
};

export default AuthForm;
