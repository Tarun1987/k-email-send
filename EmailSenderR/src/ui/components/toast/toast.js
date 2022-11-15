import React, { useEffect, useRef } from "react";

function Toast({ children, status, remove }) {
    const removeRef = useRef();
    removeRef.current = remove;

    useEffect(() => {
        const duration = 5000;
        const id = setTimeout(() => removeRef.current(), duration);
        return () => clearTimeout(id);
    }, []);

    return (
        <div className="animated down">
            <div className={status ? "msgPopup success" : "msgPopup"}>
                {/* <img
          className="closeIcon"
          src={Images["CloseIconImg"]}
          alt="Close"
          onClick={remove}
        />
        <img
          src={Images[status ? "VerifiedIconImg" : "FailedIconImg"]}
          alt=""
        /> */}
                {children}
            </div>
        </div>
    );
}

export default Toast;
