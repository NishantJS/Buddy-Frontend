import React from "react";
import Switcher from "./Switcher";
import { useForm } from "react-hook-form";
import Title from "./Title.Meta";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../../services/actions/toast";

const Meta = ({ updateMeta, nextStep, step, data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: data,
  });
  const products = useSelector((state) => state.auth.seller.products);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const isAlreadyUploaded = products.filter(
      (item) => item.title === data.title
    ).length;
    if (isAlreadyUploaded) {
      dispatch(
        addToast({
          message:
            "Product with same name already uploaded! Either edit it or add different product!",
          color: "danger",
        })
      );
      return;
    }
    updateMeta(data, "meta");
    nextStep();
  };

  const options = (minLength, maxLength, required) => {
    const option = {};
    if (minLength)
      option.minLength = {
        value: minLength,
        message: `Length should be more than ${minLength}`,
      };
    if (maxLength)
      option.maxLength = {
        value: maxLength,
        message: `Length should not be more than ${maxLength}`,
      };
    if (required) option.required = `${required} field is required`;
    return option;
  };

  return (
    <>
      <form>
        <Title errors={errors} register={register} options={options} />

        <div>
          <label>
            Description
            <textarea
              {...register("description", {
                ...options(50, 300, "Description"),
              })}
              rows={3}
            />
          </label>
          {errors["description"] && (
            <span className="error">{errors["description"]["message"]}</span>
          )}
        </div>

        <div>
          <label>
            Category
            <select
              {...register("category", {
                required: "category is required field",
              })}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </label>
          {errors["category"] && (
            <span className="error">{errors["category"]["message"]}</span>
          )}
        </div>
        <div>
          <label>
            Sub-Category
            <select
              {...register("sub_category", {
                required: "sub category is required field",
              })}
            >
              <option value="Food">Food</option>
              <option value="Treats">Treats</option>
              <option value="Health">Health</option>
              <option value="Toys">Toys</option>
              <option value="Grooming">Grooming</option>
            </select>
          </label>
          {errors["sub_category"] && (
            <span className="error">{errors["sub_category"]["message"]}</span>
          )}
        </div>
      </form>
      <Switcher step={step} nextStep={handleSubmit(onSubmit)} />
    </>
  );
};

export default Meta;
