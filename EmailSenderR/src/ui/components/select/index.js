import React from "react";
import { useField } from "formik";

const CustomSelect = (props) => {
    const [field, meta, helpers] = useField(props);
    const { setValue, setTouched } = helpers;
    const { options } = props;

    const handleChange = (e) => {
        setValue(e.target.value);
        if (typeof props.onChange === "function") {
            props.onChange(e);
        }
    };

    return (
        <>
            <label htmlFor={props.id}>
                {props.label}
                {props.requiredStar && <span className="text-danger">*</span>}
            </label>
            <select
                onBlur={() => {
                    setTouched(true);
                }}
                onChange={handleChange}
                className="form-select shadow-none form-control-linel"
            >
                <option value="">-- Select -- </option>
                {options &&
                    options.map((x, key) => {
                        return (
                            <option key={key} value={x.key}>
                                {x.value}
                            </option>
                        );
                    })}
            </select>
            {meta.touched && meta.error && (
                <span className="text-danger field-validation-error">
                    <span className="">{meta.error}</span>
                </span>
            )}
        </>
    );
};

export default CustomSelect;
