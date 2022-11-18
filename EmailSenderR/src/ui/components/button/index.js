import React from "react";
import "./style/Button.css";

const CustomButton = (props) => {
    const { children, className } = props;
    return (
        <button {...props} className={`_CustomButton ${className}`}>
            {children}
        </button>
    );
};

export default CustomButton;
