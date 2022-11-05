import React from "react";
import Screen from "../../../ui/screens/home";
import {
  submitEmailData,
  loadEmailBodyTemplate,
  loadEmailSendingProgess,
} from "../../services";

const Container = () => {
  const handleFormSubmit = async (formData) => {
    var result = await submitEmailData(formData);
    return result;
  };
  return (
    <Screen
      onSubmit={handleFormSubmit}
      onTemplateChange={loadEmailBodyTemplate}
      loadSendingProgess={loadEmailSendingProgess}
    />
  );
};

export default Container;
