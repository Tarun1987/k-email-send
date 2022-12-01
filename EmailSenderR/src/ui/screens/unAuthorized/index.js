import React from "react";

const Screen = ({}) => {
    return (
        <>
            <div className="container-fluid _Home">
                <div className="error-body text-center">
                    <h1 className="error-title text-danger">403</h1>
                    <h3 className="text-uppercase error-subtitle">Un Authorized Access!</h3>
                    <p className="text-muted m-t-30 m-b-30">You are not authorized to access this resource.</p>
                </div>
            </div>
        </>
    );
};

export default Screen;
