import React from "react";
import Select, { components } from "react-select";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useField } from "formik";

const Option = (props) => {
    var v = props.data.value;
    var fullData = props.options.find((x) => x.key === v);
    return fullData && fullData.title ? (
        <OverlayTrigger key={"tooltip"} placement={"right"} overlay={<Tooltip id={`tooltip`}>{fullData.title}</Tooltip>}>
            <div>
                <components.Option {...props} />
            </div>
        </OverlayTrigger>
    ) : (
        <components.Option {...props} />
    );
};

const CustomSelect = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue, setTouched, setError } = helpers;
    const { options } = props;

    const defaultValue = { value: "", label: "-- Select --" };
    const formattedOptions = [defaultValue];
    options.forEach((o) => {
        formattedOptions.push({ ...o, value: o.key, label: o.value });
    });

    const handleChange = (e) => {
        setValue(e.value);
        if (e.value) setError("");
        if (typeof props.onChange === "function") {
            props.onChange(e.value);
        }
    };

    const colourStyles = {
        control: (styles) => ({ ...styles }),
        option: (styles, { isDisabled }) => {
            return {
                ...styles,
                cursor: isDisabled ? "not-allowed" : "default",
            };
        },
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
        singleValue: (styles, { data }) => ({ ...styles }),
    };

    return (
        <>
            <label htmlFor={props.id}>
                {props.label}
                {props.requiredStar && <span className="text-danger">*</span>}
            </label>
            <Select
                onChange={handleChange}
                options={formattedOptions}
                defaultValue={defaultValue}
                onBlur={() => {
                    setTouched(true);
                }}
                styles={colourStyles}
                components={{ Option }}
            />
            {meta.touched && meta.error && (
                <span className="text-danger field-validation-error">
                    <span className="">{meta.error}</span>
                </span>
            )}
        </>
    );
};

export default CustomSelect;
