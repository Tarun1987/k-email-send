import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Signature name is required"),
  body: Yup.string().required("Signature body is required"),
});
