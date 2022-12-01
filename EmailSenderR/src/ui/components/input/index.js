import React from "react";
import { useField } from "formik";

const CustomInput = (props) => {
    const [field, meta] = useField(props);
    const customProps = { ...props };
    customProps.infoIcon && delete customProps.infoIcon;
    return (
        <>
            <label htmlFor={customProps.id}>{customProps.label}</label>
            {props.infoIcon && <>{props.infoIcon}</>}
            <input className="form-control text-box single-line" {...field} {...customProps}></input>
            {meta.touched && meta.error && (
                <span className="text-danger field-validation-error">
                    <span className="">{meta.error}</span>
                </span>
            )}
        </>
    );
};

export default CustomInput;
