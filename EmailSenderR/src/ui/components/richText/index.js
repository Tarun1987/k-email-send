import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { useField } from "formik";
import PropTypes from "prop-types";

const RichText = (props) => {
  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400,
  };
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleUpdate = (innerHTML) => {
    setValue(innerHTML);
    setTouched(true);
  };

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <div className="_RichText">
        <JoditEditor
          ref={editor}
          value={value}
          config={config}
          onBlur={handleUpdate}
          onChange={() => {}}
        />
      </div>

      {meta.touched && meta.error && (
        <>
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

RichText.propTypes = {
  label: PropTypes.string,
};

export default RichText;
