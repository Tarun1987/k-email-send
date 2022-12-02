import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";

const RichText = (props) => {
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
                <ReactSummernote
                    value={value}
                    options={{
                        height: 350,
                        dialogsInBody: true,
                    }}
                    onChange={handleUpdate}
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
