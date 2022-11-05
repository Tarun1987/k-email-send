import React, { createRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ProgressBar from "react-bootstrap/ProgressBar";
import EmailBody from "./emailBody";
import UploadRecipients from "./uploadRecipients";
import ValidationSchema from "./validationSchema";
import RichText from "../../components/richText";
import CustomLoader from "../../components/loader";
import ConfirmEmailSendModal from "../../components/modals/ConfirmEmailSendModal";
import "./style/Home.css";

const Screen = ({
  onSubmit: submitFormData,
  onTemplateChange: loadTemplate,
  loadSendingProgess,
}) => {
  const formikRef = createRef();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSendProgress, setShowSendProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (showSendProgress) {
      if (progressPercent < 100) {
        getSendingProgress("");
      } else {
        formikRef.current.setSubmitting(false);
        formikRef.current.resetForm();
        setTimeout(() => {
          setShowSendProgress(false);
          alert("Send to all.");
        }, 500);
      }
    }
  }, [showSendProgress, progressPercent]);

  const initialValues = {
    subject: "",
    greetings: "",
    bodyTemplate: "",
    recipientsTemplate: "default",
    attachmentFile: "",
    recipientFile: "",
    body: "",
  };

  const handleOnSubmit = async (values, { resetForm, setErrors }) => {
    var result = await submitFormData(values);
    setList(result);
    setShowConfirmModal(true);
    formikRef.current.setSubmitting(false);
  };

  const handleTemplateChange = async (value, setFieldValue) => {
    formikRef.current.setSubmitting(true);
    const html = await loadTemplate(value);
    formikRef.current.setSubmitting(false);
    setFieldValue("body", html);
  };

  const handleConfirmModalClose = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmModalSubmit = () => {
    setShowConfirmModal(false);
    setShowSendProgress(true);
    formikRef.current.setSubmitting(true);
    getSendingProgress("");
  };

  const getSendingProgress = async (data) => {
    const progress = await loadSendingProgess(progressPercent);
    setProgressPercent(progress);
  };

  return (
    <>
      {showConfirmModal && (
        <ConfirmEmailSendModal
          show={showConfirmModal}
          list={list}
          onClose={handleConfirmModalClose}
          onSubmit={handleConfirmModalSubmit}
        />
      )}
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => {
          const { setFieldValue, values, isSubmitting } = formik;
          return (
            <Form>
              <div className="container-fluid _Home">
                {showSendProgress && (
                  <div className="col-md" style={{ marginBottom: "10px" }}>
                    <ProgressBar
                      animated
                      now={progressPercent}
                      label={`${progressPercent}%`}
                    />
                  </div>
                )}
                <div className="card">
                  <div className="card-body">
                    {isSubmitting && <CustomLoader />}
                    <div className="row">
                      <div className="col-lg-8 col-xlg-9 col-md-7 body-panel-container">
                        <EmailBody
                          onTemplateChange={(event) => {
                            handleTemplateChange(
                              event.target.value,
                              setFieldValue
                            );
                          }}
                        />
                      </div>
                      <div className="col-lg-4 col-xlg-3 col-md-5">
                        <UploadRecipients
                          recipientsTemplate={
                            values
                              ? values.recipientsTemplate
                              : initialValues.recipientsTemplate
                          }
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <RichText label={"Body"} id="body" name="body" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ float: "right" }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Screen;
