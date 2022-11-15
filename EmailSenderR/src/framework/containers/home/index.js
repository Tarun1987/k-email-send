import React from "react";
import Screen from "../../../ui/screens/home";
import { submitEmailData, getClassificationMaster, loadEmailSendProgress } from "../../services/home";
import { getRecipientsMaster, loadRecipients } from "../../services/recipient";
import { loadTemplates } from "../../services/template";

const Container = () => {
    return (
        <Screen
            onSubmit={submitEmailData}
            loadEmailSendProgress={loadEmailSendProgress}
            getRecipientsMaster={getRecipientsMaster}
            getTemplates={loadTemplates}
            getClassifications={getClassificationMaster}
            getRecipientListByName={loadRecipients}
        />
    );
};

export default Container;
