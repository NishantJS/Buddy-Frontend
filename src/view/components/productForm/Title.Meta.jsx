import React from "react";

const Title = ({ errors, register, options }) => {
  return (
    <div>
      <label>
        Title
        <input
          name="title"
          type="text"
          aria-invalid={errors["title"] ? "true" : "false"}
          {...register("title", { ...options(true, 3, 30, "Title") })}
        />
      </label>
      {errors["title"] && (
        <span className="error">{errors["title"]["message"]}</span>
      )}
    </div>
  );
};

export default Title;
