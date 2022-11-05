import React from "react";
import { useField } from "formik";

const CustomSelect = (props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <select {...props} className="form-select shadow-none form-control-linel">
        <option value="">Blank</option>
        <option value="basic">Basic template</option>
        <option value="custom">Custom template</option>
      </select>
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

export default CustomSelect;
