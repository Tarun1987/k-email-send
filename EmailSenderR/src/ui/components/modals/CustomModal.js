import React from "react";
import Modal from "react-bootstrap/Modal";
import CustomButton from "../button";

const CustomModal = ({ title, show, onClose: handleClose, onSubmit: handleSubmit, children, submitText, cancelText, size = "lg" }) => {
    return (
        <Modal
            size={size}
            show={show}
            onHide={handleClose}
            scrollable={true}
            backdrop={"static"}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <CustomButton className="btn btn-secondary" onClick={handleClose}>
                    {cancelText}
                </CustomButton>
                <CustomButton className="btn btn-primary" onClick={handleSubmit}>
                    {submitText}
                </CustomButton>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
