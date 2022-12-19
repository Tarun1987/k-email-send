import React from "react";
import Table from "react-bootstrap/Table";
import CustomModal from "./CustomModal";

const ConfirmEmailSendModal = ({ show, onClose: handleClose, onSubmit: handleSubmit, list }) => {
    return (
        <CustomModal
            size="lg"
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            cancelText={"Cancel"}
            submitText={"Save"}
            title={"Confirm sending email to below users?"}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Client Email</th>
                        <th>CC</th>
                        <th>BCC</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((x, key) => {
                        return (
                            <tr key={key}>
                                <td>{x.ClientName}</td>
                                <td>{x.ClientEmail}</td>
                                <td>{x.CC}</td>
                                <td>{x.BCC}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </CustomModal>
    );
};

export default ConfirmEmailSendModal;
