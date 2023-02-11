import React, { useState } from "react";
import { useField } from "formik";

const GreetingControl = (props) => {
    const [font, setFont] = useState("Default");
    const [text, setText] = useState("");
    const [field, meta, helpers] = useField(props.name);

    const { value } = meta;
    const { setValue, setTouched } = helpers;

    const handleInputChange = (e) => {
        setText(e.target.value);
        setFormattedValue(e.target.value, font);
        setTouched(true);
    };

    const handleFontChange = (e) => {
        setFont(e.target.value);
        setFormattedValue(text, e.target.value);
        setTouched(true);
    };

    const setFormattedValue = (text, font) => {
        if (!text) {
            setValue(null);
        } else {
            setValue(`<span style="font-family: ${font};">${text} [CLIENT_NAME]</span>`);
        }
    };

    return (
        <>
            <div className="input-group">
                <label htmlFor={props.id} style={{ width: "100%" }}>
                    {props.label}
                    {props.requiredStar && <span className="text-danger">*</span>}
                    {props.infoIcon && <>{props.infoIcon}</>}
                </label>
                <div className="row">
                    <input
                        style={{ width: "70%", fontFamily: font || "Default" }}
                        className="form-control text-box single-line"
                        onChange={handleInputChange}
                    ></input>
                    <select
                        style={{ width: "30%", borderLeft: "0" }}
                        className="form-select shadow-none form-control-linel"
                        onChange={handleFontChange}
                    >
                        <option value="Default" style={{ fontFamily: "Default" }}>
                            Default
                        </option>
                        <option value="Calibri" style={{ fontFamily: "Calibri" }}>
                            Calibri
                        </option>
                        <option value="Impact" style={{ fontFamily: "Impact" }}>
                            Impact
                        </option>
                        <option value="Vardana" style={{ fontFamily: "Vardana" }}>
                            Vardana
                        </option>
                    </select>
                </div>
            </div>
            {meta.touched && meta.error && (
                <span className="text-danger field-validation-error">
                    <span className="">{meta.error}</span>
                </span>
            )}
        </>
    );
};

export default GreetingControl;
