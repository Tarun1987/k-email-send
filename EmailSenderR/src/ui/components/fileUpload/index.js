import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import "./style/FileUpload.css";

const FileUpload = (props) => {
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (event) => {
    setValue(event.currentTarget.files[0]);
  };

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <div className="_FileUpload btn btn-primary">
        <i className="mdi mdi-upload"></i>
        {value && value.name ? "Change" : "Upload"}
        <input
          type="file"
          className="form-control-file"
          onChange={handleChange}
          onBlur={() => {
            setTouched(true);
          }}
        />
      </div>

      {value && value.name && (
        <>
          <br />
          <span className=" field-validation-error">{value.name}</span>
        </>
      )}

      {meta.touched && meta.error && (
        <>
          <br />
          <span className="text-danger field-validation-error">
            <span id="Subject-error" className="">
              {meta.error}
            </span>
          </span>
        </>
      )}
    </>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string,
};

export default FileUpload;
