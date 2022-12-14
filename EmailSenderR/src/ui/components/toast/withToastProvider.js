import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import "./style/toast.css";

import ToastContext from "./context";
import Toast from "./toast";

// Create a random ID
function generateUEID() {
    let first = (Math.random() * 46656) | 0;
    let second = (Math.random() * 46656) | 0;
    first = ("000" + first.toString(36)).slice(-3);
    second = ("000" + second.toString(36)).slice(-3);

    return first + second;
}

function withToastProvider(Component) {
    function WithToastProvider(props) {
        const [toasts, setToasts] = useState([]);

        const success = (content) => {
            const id = generateUEID();
            setToasts([{ id, content, status: true }]);
        };

        const danger = (content) => {
            const id = generateUEID();
            setToasts([{ id, content, status: false }]);
        };

        const remove = (id) => setToasts(toasts.filter((t) => t.id !== id));

        const providerValue = useMemo(() => {
            return { success, danger, remove };
        }, [toasts]);

        return (
            <ToastContext.Provider value={providerValue}>
                <Component {...props} />

                {createPortal(
                    <div className="sliderCard tostContainer active">
                        {toasts.map((t) => (
                            <Toast key={t.id} remove={() => remove(t.id)} status={t.status}>
                                {t.content}
                            </Toast>
                        ))}
                    </div>,
                    document.body
                )}
            </ToastContext.Provider>
        );
    }

    return WithToastProvider;
}

export default withToastProvider;
