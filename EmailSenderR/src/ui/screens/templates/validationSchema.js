import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("Template name is required"),
  body: Yup.string().required("Template body is required"),
});
