import React from "react";
import Screen from "../../../ui/screens/templates";
import { loadTemplates, updateShareStatus, submitTemplate } from "../../services/template";

const Container = () => {
    return <Screen onLoad={loadTemplates} onSubmit={submitTemplate} onShareUpdate={updateShareStatus} />;
};

export default Container;
