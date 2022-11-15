import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

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
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmEmailSendModal;
