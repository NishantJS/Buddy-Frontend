import { useState } from "react";
import { useForm } from "react-hook-form";
import AddressFormData from "../../data/addAddress.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addToast } from "../services/actions/toast.js";
import AddressList from "./AddressList.jsx";
import { addAddress } from "../services/actions/auth.js";

const AddAddress = ({ isSeller }) => {
  const data = useSelector((state) => state.auth[isSeller ? "seller" : "user"]);
  const [isClicked, setClicked] = useState(() => false);
  const dispatch = useDispatch();

  const updateClicked = () => {
    if (data?.address?.length > 3) {
      dispatch(
        addToast({
          message:
            "Address length exceeds! Please delete any one address to add this",
          color: "danger",
        })
      );
      return;
    }
    setClicked((prev) => !prev);
  };

  return (
    <div className="add_address" id="address">
      {!isClicked ? (
        <>
          <div className="list">
            <AddressList data={data} dispatch={dispatch} isSeller={isSeller} />
          </div>
          <Button handler={updateClicked} />
        </>
      ) : (
        <AddressForm
          handler={updateClicked}
          dispatch={dispatch}
          isSeller={isSeller}
        />
      )}
    </div>
  );
};

const Button = ({ handler }) => {
  return <button onClick={handler}>Add Address</button>;
};

const AddressForm = ({ handler, dispatch, isSeller }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post(
      `/${isSeller ? "seller" : "user"}/address/add`,
      { ...data },
      { validateStatus: () => true }
    );

    const address = {
      full_name: data.full_name,
      line1: data.line1,
      line2: data.line2,
      state: data.state,
      city: data.city,
      phone: [data.phone],
      pin: data.pin,
      isPrimary: data.isPrimary,
    };

    if (!response?.data?.error) dispatch(addAddress({ address, isSeller }));
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
