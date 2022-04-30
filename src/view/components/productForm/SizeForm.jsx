import React from "react";
import { sizesOptions } from "../../../data/addSizes";

const SizeForm = ({ register, errors }) => {
  return sizesOptions?.map(({ name, type, options }) => (
    <div key={name}>
      {" "}
      <label>
        {name}
        <input
          name={name}
          type={type}
          aria-invalid={errors[name] ? "true" : "false"}
          {...register(name, { ...options })}
        />
      </label>
      {errors[name] && <span className="error">{errors[name]["message"]}</span>}
    </div>
  ));
};

export default SizeForm;
