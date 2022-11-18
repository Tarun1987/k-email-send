import React from "react";
import "./style/CheckBox.css";

const CustomCheckBox = (props) => {
    const { className, label } = props;
    return (
        <label className="_CustomCheckBox">
            {label && <>{label}</>}
            <input type="checkbox" {...props} />
            <span className="checkmark"></span>
        </label>
    );
};

export default CustomCheckBox;
