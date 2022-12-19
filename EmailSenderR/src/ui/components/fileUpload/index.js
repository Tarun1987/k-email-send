import React from "react";
import { useField } from "formik";
import PropTypes from "prop-types";
import "./style/FileUpload.css";

const FileUpload = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const { multiple } = props;

    const { value } = meta;
    const { setValue, setTouched } = helpers;

    const handleChange = (event) => {
        if (multiple) {
            var list = [];
            for (let i = 0; i < event.currentTarget.files.length; i++) {
                const file = event.currentTarget.files[i];
                list.push(file);
            }
            setValue(list);
        } else {
            setValue(event.currentTarget.files[0]);
        }
    };

    const isFileSelected = () => {
        return value && (value.name || value.length > 0);
    };

    return (
        <>
            <label htmlFor={props.id}>{props.label}</label>
            <br />
            <div className="_FileUpload btn btn-primary">
                <i className="mdi mdi-upload"></i>
                {isFileSelected() ? "Change" : "Upload"}
                <input
                    type="file"
                    className="form-control-file"
                    onChange={handleChange}
                    multiple={multiple}
                    onBlur={() => {
                        setTouched(true);
                    }}
                />
            </div>

            {isFileSelected() && (
                <>
                    {multiple ? (
                        value.map((x, key) => {
                            return (
                                <span key={key}>
                                    <br />
                                    <span className=" field-validation-error">{x.name}</span>
                                </span>
                            );
                        })
                    ) : (
                        <>
                            <br />
                            <span className=" field-validation-error">{value.name}</span>
                        </>
                    )}
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
