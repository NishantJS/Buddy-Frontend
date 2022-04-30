import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Switcher from "./Switcher.jsx";
import SizeForm from "./SizeForm.jsx";
import SizesList from "./SizesListContainer.jsx";
import { useDispatch } from "react-redux";
import { addToast } from "../../services/actions/toast";

const Sizes = ({ prevStep, nextStep, updateSizes, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  const [sizes, setSizes] = useState(() => data);
  const [isAdded, setAdded] = useState(() => (sizes.length < 1 ? false : true));

  const addSizes = (size) => {
    setSizes((prev) => [...prev, size]);
  };

  const deleteSize = (size) => {
    setSizes((prev) => {
      return prev.filter((item) => item?.size !== size);
    });
  };

  const toggleAdded = () => {
    setAdded((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log(data);
    if (!isAdded) {
      if (sizes.filter((item) => item.size === data.size).length) {
        dispatch(
          addToast({
            message: "Size with the same name already exists",
            color: "danger",
          })
        );
        reset({ size: "" });
        return;
      }
      reset();
      addSizes(data);
      toggleAdded();
      return;
    }
  };

  const onCancel = () => {
    reset();
    toggleAdded();
    return;
  };

  const onNext = () => {
    if (!isAdded) {
      dispatch(
        addToast({
          message:
            "Please add the size first or cancel before proceeding to next step",
          color: "danger",
        })
      );
      return;
    }
    if (sizes.length < 1) {
      dispatch(
        addToast({ message: "Please add at least one size", color: "danger" })
      );
      return;
    }
    updateSizes(sizes, "sizes");
    nextStep();
  };

  return (
    <>
      <form>
        {isAdded ? (
          <SizesList
            toggle={toggleAdded}
            sizes={sizes}
            deleteSize={deleteSize}
          />
        ) : (
          <>
            <SizeForm register={register} errors={errors} />
            <div className="secondary_buttons">
              <button className="cancel" onClick={onCancel}>
                Cancel
              </button>
              <button onClick={handleSubmit(onSubmit)}>Add Size</button>
            </div>
          </>
        )}
      </form>

      <Switcher prevStep={prevStep} nextStep={onNext} />
    </>
  );
};

export default Sizes;
