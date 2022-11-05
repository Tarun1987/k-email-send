import React from "react";
import "./style/CustomLoader.css";

const CustomLoader = () => {
  return (
    <div className="preloader _CustomLoader">
      <div className="lds-ripple">
        <div className="lds-pos"></div>
        <div className="lds-pos"></div>
      </div>
    </div>
  );
};

export default CustomLoader;
