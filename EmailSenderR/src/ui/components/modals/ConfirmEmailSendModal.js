import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import CustomModal from "./CustomModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomCheckBox from "../checkbox";

const ConfirmEmailSendModal = ({ show, titleBadgeStr, onClose: handleClose, onSubmit: handleSubmit, list }) => {
    const [acknowledged, setAcknowledged] = useState(false);

    return (
        <CustomModal
            size="xl"
            show={show}
            onClose={handleClose}
            onSubmit={handleSubmit}
            cancelText={"Cancel"}
            submitText={"Save"}
            aria-labelledby="example-modal-sizes-title-lg"
            title={
                <>
                    <span>Confirm sending </span>
                    <OverlayTrigger
                        key={"tooltip"}
                        placement={"bottom"}
                        overlay={
                            <Tooltip id={`tooltip`}>
                                This is some <strong>{titleBadgeStr}</strong> text.
                            </Tooltip>
                        }
                    >
                        <span className={`badge bg-${titleBadgeStr === "Public" ? "warning" : "primary"}`}>{titleBadgeStr}</span>
                    </OverlayTrigger>
                    <span> email to below users?</span>
                    <br />
                    <CustomCheckBox
                        checked={acknowledged}
                        onChange={(e) => {
                            setAcknowledged(!acknowledged);
                        }}
                    />
                    <span>Please check this</span>
                </>
            }
            disableSubmit={!acknowledged}
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
