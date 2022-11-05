import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const CustomToggleButton = (props) => {
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (e) => {
    setValue(e.currentTarget.value);
    setTouched(true);
  };

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <div className="_CustomToggleButton">
        <ButtonGroup className="choose-template">
          {props.options.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`${props.id}-${idx}`}
              type="radio"
              name={props.name}
              size="sm"
              value={radio.value}
              checked={value === radio.value}
              onChange={handleChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
};

CustomToggleButton.propTypes = {
  label: PropTypes.string,
};

export default CustomToggleButton;
