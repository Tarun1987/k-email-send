import React from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import CustomButton from "../button";

const ConfirmEmailSendModal = ({ show, onClose: handleClose, onSubmit: handleSubmit, list }) => {
    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            scrollable={true}
            backdrop={"static"}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header>
                <Modal.Title>Confirm sending email to below users?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Client Email</th>
                            <th>CC</th>
                            <th>BCC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((x, key) => {
                            return (
                                <tr key={key}>
                                    <td>{x.ClientEmail}</td>
                                    <td>{x.CC}</td>
                                    <td>{x.BCC}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <CustomButton className="btn btn-secondary" onClick={handleClose}>
                    Close
                </CustomButton>
                <CustomButton className="btn btn-primary" onClick={handleSubmit}>
                    Send
                </CustomButton>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmEmailSendModal;
