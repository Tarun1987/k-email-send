import React from "react";
import { useField } from "formik";

const CustomInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        className="form-control text-box single-line"
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && (
        <span className="text-danger field-validation-error">
          <span id="Subject-error" className="">
            {meta.error}
          </span>
        </span>
      )}
    </>
  );
};

export default CustomInput;
