import * as Yup from "yup";

export default Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    greetings: Yup.string().required("Greetings is required"),
    selectedTemplate: Yup.string(),
    signature: Yup.string(),
    attachmentFile: Yup.mixed(),
    classification: Yup.string().required("Email classification is required"),
    selectedRecipient: Yup.string().required("Recipient is required"),
    body: Yup.string().required("Email body is required"),
});
