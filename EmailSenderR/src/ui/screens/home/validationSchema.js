import * as Yup from "yup";

export default Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  greetings: Yup.string().required("Greetings is required"),
  selectedTemplate: Yup.string(),
  attachmentFile: Yup.mixed().required("Attachment file is required"),
  body: Yup.string().required("Email body is required"),
  recipientsTemplate: Yup.string(),
  recipientFile: Yup.mixed().when("recipientsTemplate", {
    is: "new",
    then: Yup.mixed().required("Recipients file is required"),
  }),
});
