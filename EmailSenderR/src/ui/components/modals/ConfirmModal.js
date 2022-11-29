import React from "react";
import CustomModal from "./CustomModal";

const ConfirmModal = ({ title, body, show, onClose: handleClose, onSubmit: handleSubmit }) => {
    return (
        <CustomModal
            size="md"
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            cancelText={"Cancel"}
            submitText={"Save"}
            title={title || "Are you sure to continue?"}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <div>{body}</div>
        </CustomModal>
    );
};

export default ConfirmModal;
