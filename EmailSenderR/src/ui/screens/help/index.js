import React from "react";
import BreadCrumb from "../../components/breadcrumb";

const Screen = ({}) => {
    return (
        <>
            <BreadCrumb activeTab={"Help"} />
            <div>This is from help page</div>
        </>
    );
};

export default Screen;
