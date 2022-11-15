import React, { createRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ProgressBar from "react-bootstrap/ProgressBar";
import EmailBody from "./emailBody";
import ValidationSchema from "./validationSchema";
import RichText from "../../components/richText";
import CustomLoader from "../../components/loader";
import { useToast, withToastProvider } from "../../components/toast";
import ConfirmEmailSendModal from "../../components/modals/ConfirmEmailSendModal";
import "./style/Home.css";

const Screen = ({
    onSubmit: submitFormData,
    getRecipientsMaster,
    getTemplates,
    getClassifications,
    getRecipientListByName,
    loadEmailSendProgress,
}) => {
    const formikRef = createRef();
    const toast = useToast();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSendProgress, setShowSendProgress] = useState(false);
    const [progressPercent, setProgressPercent] = useState(0);
    const [submitResponse, setSubmitResponse] = useState({});
    const [dataToSubmit, setDataToSubmit] = useState({});
    const [recipientUserList, setRecipientUserList] = useState([]);
    const [recipientList, setRecipientList] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [classificationList, setClassificationList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (submitResponse.TotalCount) getSendingProgress(submitResponse);
    }, [submitResponse]);

    useEffect(() => {
        if (showSendProgress) {
            if (progressPercent < 100) {
                getSendingProgress(submitResponse);
            } else {
                formikRef.current.setSubmitting(false);
                formikRef.current.resetForm();
                setTimeout(() => {
                    setShowSendProgress(false);
                    toast.success("Send to all.");
                }, 500);
            }
        }
    }, [showSendProgress, progressPercent]);

    useEffect(() => {
        console.log(1);
        if (recipientUserList.length > 0) {
            setShowConfirmModal(true);
        }
    }, [recipientUserList]);

    const initialValues = {
        subject: "",
        greetings: "",
        selectedTemplate: "",
        attachmentFile: "",
        classification: "",
        selectedRecipient: "",
        body: "",
    };

    const loadData = async () => {
        // Get recipients
        var recipients = await getRecipientsMaster();
        if (recipients && recipients.length > 0) {
            setRecipientList(
                recipients.map((x) => {
                    return { key: x, value: x };
                })
            );
        }

        // get classifications
        var classifications = await getClassifications();
        setClassificationList(classifications);

        // Get templates
        var templates = await getTemplates();
        if (templates && templates.length > 0) {
            setTemplateList(
                templates.map((x) => {
                    return { key: x.Id, value: x.Name, html: x.Html };
                })
            );
        }
    };

    const handleOnSubmit = async (values, { resetForm, setErrors }) => {
        try {
            setDataToSubmit(values);
            formikRef.current.setSubmitting(true);
            var list = await getRecipientListByName(values.selectedRecipient, false);
            setRecipientUserList(list);
            formikRef.current.setSubmitting(false);
        } catch (error) {
            formikRef.current.setSubmitting(false);
        }
    };

    const handleTemplateChange = async (value, setFieldValue) => {
        var data = templateList.find((x) => x.key === parseInt(value));
        setFieldValue("body", data ? data.html : "");
    };

    const handleConfirmModalClose = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmModalSubmit = async () => {
        try {
            // const formData = new FormData();
            // formData.append("attachmentFile", dataToSubmit.attachmentFile);
            // formData.append("subject", dataToSubmit.subject);
            // formData.append("greeting", dataToSubmit.greetings);
            // formData.append("selectedTemplate", dataToSubmit.selectedTemplate);
            // formData.append("body", dataToSubmit.body);
            // formData.append("classification", dataToSubmit.classification);
            // formData.append("selectedRecipient", dataToSubmit.selectedRecipient);

            var data = {
                // attachmentFile: dataToSubmit.attachmentFile,
                subject: dataToSubmit.subject,
                greeting: dataToSubmit.greetings,
                selectedTemplate: dataToSubmit.selectedTemplate,
                body: dataToSubmit.body,
                classification: dataToSubmit.classification,
                selectedRecipient: dataToSubmit.selectedRecipient,
            };

            var result = await submitFormData(data);
            setShowConfirmModal(false);
            if (result && result.TotalCount) {
                setShowSendProgress(true);
                formikRef.current.setSubmitting(true);
                setSubmitResponse(result);
            } else {
                toast.danger("Error sending email");
            }
        } catch (error) {
            toast.danger("Error sending email");
        }
    };

    const getSendingProgress = async (response) => {
        try {
            const progressResult = await loadEmailSendProgress(response.UniqueId);
            var percent = (parseInt(progressResult.completed) / parseInt(response.TotalCount)) * 100;
            setProgressPercent(percent);
        } catch (error) {}
    };

    return (
        <>
            {showConfirmModal && (
                <ConfirmEmailSendModal
                    show={showConfirmModal}
                    list={recipientUserList}
                    onClose={handleConfirmModalClose}
                    onSubmit={handleConfirmModalSubmit}
                />
            )}
            <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={handleOnSubmit}
                validateOnChange={false}
            >
                {(formik) => {
                    const { setFieldValue, values, isSubmitting } = formik;
                    return (
                        <Form>
                            <div className="container-fluid _Home">
                                {showSendProgress && (
                                    <div className="col-md" style={{ marginBottom: "10px" }}>
                                        <ProgressBar animated now={progressPercent} label={`${progressPercent}%`} />
                                    </div>
                                )}
                                <div className="card">
                                    <div className="card-body">
                                        {isSubmitting && <CustomLoader />}
                                        <div className="row">
                                            <div className="col-md-12 body-panel-container">
                                                <EmailBody
                                                    templateList={templateList}
                                                    recipientList={recipientList}
                                                    classificationList={classificationList}
                                                    onTemplateChange={(event) => {
                                                        handleTemplateChange(event.target.value, setFieldValue);
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <RichText label={"Body of Email"} id="body" name="body" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <button type="submit" className="btn btn-primary" style={{ float: "right" }}>
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

export default withToastProvider(Screen);
