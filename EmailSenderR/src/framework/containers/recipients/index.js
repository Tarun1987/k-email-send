import React from "react";
import Screen from "../../../ui/screens/recipients";
import {
    loadRecipients,
    getRecipientsMaster,
    updateRecipient,
    getMasterDownloadURL,
    uploadRecipients,
    deleteRecipient,
} from "../../services/recipient";

const Container = () => {
    return (
        <Screen
            onLoad={loadRecipients}
            onMasterLoad={getRecipientsMaster}
            onUpdate={updateRecipient}
            masterTemplateUrl={getMasterDownloadURL()}
            onMasterUpload={uploadRecipients}
            onDelete={deleteRecipient}
        />
    );
};

export default Container;
