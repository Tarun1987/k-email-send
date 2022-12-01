import React from "react";

const Screen = ({}) => {
    return (
        <>
            <div className="container-fluid _Home">
                <div className="error-body text-center">
                    <h1 className="error-title text-danger">404</h1>
                    <h3 className="text-uppercase error-subtitle">Not Found!</h3>
                    <p className="text-muted m-t-30 m-b-30">Seems like resource don't exists.</p>
                </div>
            </div>
        </>
    );
};

export default Screen;
