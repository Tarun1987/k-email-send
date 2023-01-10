import React from "react";
import Screen from "../../../ui/screens/home";
import { submitEmailData, getClassificationMaster, loadEmailSendProgress, previewEmailData } from "../../services/home";
import { getRecipientsMaster, loadRecipients } from "../../services/recipient";
import { loadTemplates } from "../../services/template";
import { loadSignatures } from "../../services/signature";

const Container = () => {
    return (
        <Screen
            onSubmit={submitEmailData}
            loadEmailSendProgress={loadEmailSendProgress}
            getRecipientsMaster={getRecipientsMaster}
            getTemplates={loadTemplates}
            getClassifications={getClassificationMaster}
            getRecipientListByName={loadRecipients}
            getSignatures={loadSignatures}
            onEmailPreview={previewEmailData}
        />
    );
};

export default Container;
