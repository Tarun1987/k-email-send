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
            <div className={status ? "msgPopup success" : "msgPopup error"}>
                <i style={{ marginRight: "10px" }} className={`mdi mdi-18px ${status ? "mdi-checkbox-marked-circle" : "mdi-alert"}`}></i>
                {children}
                <i className="mdi mdi-close mdi-18px closeIcon" onClick={remove}></i>
            </div>
        </div>
    );
}

export default Toast;
