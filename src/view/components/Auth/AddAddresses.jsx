import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import Data from "../Cart/AddressData.json";

const Addresses = () => {
  const toRender = <AddAddress />;
  return toRender;
};

export default Addresses;

const AddAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Data.map(
          ({
            id,
            placeholder,
            type,
            required = true,
            value = "",
            pattern,
            ...other
          }) => {
            return (
              <article key={id + value}>
                <label>{placeholder || id}</label>
                <input
                  type={type}
                  {...register(id, {
                    required,
                    pattern: new RegExp(pattern) + "i",
                    ...other,
                  })}
                />
                {errors[id]?.message}
              </article>
            );
          }
        )}
        <article>
          <input type="submit" value="submit" />
        </article>
      </form>
    </div>
  );
};
