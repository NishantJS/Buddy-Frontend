import { useState } from "react";
import { useForm } from "react-hook-form";
import AddressFormData from "../../data/addAddress.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToast } from "../services/actions/toast.js";
import AddressList from "./AddressList.jsx";

const AddAddress = ({ isSeller }) => {
  const [isClicked, setClicked] = useState(() => false);

  const updateClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <div className="add_address" id="address">
      {!isClicked ? (
        <>
          <div className="list">
            <AddressList isSeller={isSeller} />
          </div>
          <Button handler={updateClicked} />
        </>
      ) : (
        <AddressForm handler={updateClicked} />
      )}
    </div>
  );
};

const Button = ({ handler }) => {
  return <button onClick={handler}>Add Address</button>;
};

const AddressForm = ({ handler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const response = await axios.post(
      "/user/address/add",
      { ...data },
      { validateStatus: () => true }
    );
    console.log(response?.data?.error, response?.data?.data);
    handler();
  };

  const fetchCity = async (event) => {
    const clearState = () => {
      setValue("city", "");
      setValue("state", "");
    };

    const value = event?.target?.value;
    if (!value || isNaN(parseInt(value))) {
      clearState();
      return;
    }
    const regex = /[1-9]{1}[0-9]{5}$/;
    const pincode = parseInt(value);
    if (!regex.test(value)) {
      clearState();
      return;
    }

    const { data } = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    if (
      data[0].Status === "Error" ||
      data[0].PostOffice[0]["DeliveryStatus"] !== "Delivery"
    ) {
      dispatch(
        addToast({
          message: "Sorry! Address is not available for deleivery yet!",
          color: "danger",
        })
      );
      clearState();
      return;
    }

    const postOffice = data[0].PostOffice[0];

    const block =
      postOffice.Block !== "NA" ? postOffice.Block : postOffice.District;
    setValue("city", block);
    setValue("state", postOffice.State);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AddressFormData?.map(
        ({ name, value = "", type, options, disabled = false }) => {
          return (
            <div key={`${name}${value}`}>
              <label>
                {value || name}
                <input
                  name={name}
                  type={type}
                  aria-invalid={errors[name] ? "true" : "false"}
                  {...register(name, { ...options })}
                  disabled={disabled}
                  onChange={(e) => (name === "pin" ? fetchCity(e) : {})}
                />
              </label>
              {errors[name] && (
                <span className="error">{errors[name]["message"]}</span>
              )}
            </div>
          );
        }
      )}
      <input
        type="submit"
        // disabled={Object.keys(errors).length === 0 ? false : true}
      />
    </form>
  );
};

export default AddAddress;
