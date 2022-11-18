import React from "react";
import Screen from "../../../ui/screens/signatures";
import { loadSignatures, submitSignature, updateShareStatus, deleteSignatures } from "../../services/signature";

const Container = () => {
    return <Screen onLoad={loadSignatures} onSubmit={submitSignature} onShareUpdate={updateShareStatus} onDelete={deleteSignatures} />;
};

export default Container;
