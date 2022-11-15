import React from "react";
import Screen from "../../../ui/screens/recipients";
import { loadRecipients, getRecipientsMaster, updateRecipient, getMasterDownloadURL, uploadRecipients } from "../../services/recipient";

const Container = () => {
    return (
        <Screen
            onLoad={loadRecipients}
            onMasterLoad={getRecipientsMaster}
            onUpdate={updateRecipient}
            masterTemplateUrl={getMasterDownloadURL()}
            onMasterUpload={uploadRecipients}
        />
    );
};

export default Container;
