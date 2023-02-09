import React, { createRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import ProgressBar from "react-bootstrap/ProgressBar";
import EmailBody from "./emailBody";
import ValidationSchema from "./validationSchema";
import RichText from "../../components/richText";
import CustomLoader from "../../components/loader";
import { useToast, withToastProvider } from "../../components/toast";
import ConfirmEmailSendModal from "../../components/modals/ConfirmEmailSendModal";
import CustomButton from "../../components/button";
import "./style/Home.css";

const Screen = ({
    onSubmit: submitFormData,
    getRecipientsMaster,
    getTemplates,
    getClassifications,
    getRecipientListByName,
    loadEmailSendProgress,
    getSignatures,
    onEmailPreview: handleEmailPreview,
}) => {
    const formikRef = createRef();
    const toast = useToast();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSendProgress, setShowSendProgress] = useState(false);
    const [progressResult, setProgressResult] = useState({ percent: 0, failed: 0, passed: 0 });
    const [submitResponse, setSubmitResponse] = useState({});
    const [dataToSubmit, setDataToSubmit] = useState({});
    const [recipientUserList, setRecipientUserList] = useState([]);
    const [recipientList, setRecipientList] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [signatureList, setSignatureList] = useState([]);
    const [classificationList, setClassificationList] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (submitResponse.TotalCount) getSendingProgress(submitResponse);
    }, [submitResponse]);

    useEffect(() => {
        if (showSendProgress) {
            if (progressResult.percent < 100) {
                setTimeout(() => {
                    getSendingProgress(submitResponse);
                }, 1500);
            } else {
                formikRef.current.setSubmitting(false);
                formikRef.current.resetForm();
                setTimeout(() => {
                    setShowSendProgress(false);
                    var message = `Process completed :: Passed: ${progressResult.passed} | Failed: ${progressResult.failed}.`;
                    if (progressResult.failed == 0) {
                        toast.success(message);
                    } else {
                        toast.danger(message);
                    }
                }, 500);
            }
        }
    }, [showSendProgress, progressResult]);

    useEffect(() => {
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
        signature: "",
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

        // Get Signatures
        var signatures = await getSignatures();
        if (signatures && signatures.length > 0) {
            setSignatureList(
                signatures.map((x) => {
                    return { key: x.Id, value: x.Name, html: x.Html };
                })
            );
        }
    };

    const handleOnSubmit = async (values, {}) => {
        try {
            setDataToSubmit(values);
            formikRef.current.setSubmitting(true);
            var list = await getRecipientListByName(values.selectedRecipient, false);
            if (list.length > 0) {
                setRecipientUserList(list);
                formikRef.current.setSubmitting(false);
            } else {
                toast.danger("Error loading recipients list");
            }
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
        setRecipientUserList([]);
    };

    const handleConfirmModalSubmit = async () => {
        try {
            var data = getEmailSubmitBody(dataToSubmit);
            formikRef.current.setSubmitting(true);
            setShowConfirmModal(false);
            var result = await submitFormData(data);
            if (result && result.TotalCount) {
                setSubmitResponse(result);
            } else {
                toast.danger("Error sending email");
                formikRef.current.setSubmitting(false);
            }
        } catch (error) {
            toast.danger("Error sending email");
            formikRef.current.setSubmitting(false);
        }
    };

    const getSendingProgress = async (response) => {
        try {
            const pResult = await loadEmailSendProgress(response.UniqueId, progressResult.percent);
            var percent = (parseInt(pResult.completed) / parseInt(response.TotalCount)) * 100;
            setShowSendProgress(true);
            setProgressResult({ percent, failed: pResult.failed, passed: pResult.passed });
        } catch (error) {}
    };

    const getEmailSubmitBody = (values) => {
        return {
            attachmentFile: values.attachmentFile,
            subject: values.subject,
            greeting: `<span style="font-family: Calibri;">${values.greetings} [CLIENT_NAME]</span>`,
            selectedTemplate: values.selectedTemplate,
            body: values.body,
            classification: values.classification,
            selectedRecipient: values.selectedRecipient,
            signatureId: values.signature,
        };
    };

    const handlePreview = async (values, setSubmitting) => {
        setSubmitting(true);
        try {
            var result = await handleEmailPreview(getEmailSubmitBody(values));
            setSubmitting(false);
            if (result.status === "OK") {
                var win = window.open(
                    "",
                    "Title",
                    "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=" +
                        (screen.height - 400) +
                        ",left=" +
                        (screen.width - 840)
                );
                win.document.body.innerHTML = result.previewData;
            }
        } catch (error) {
            setSubmitting(false);
        }
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
                    const { setFieldValue, values, isSubmitting, setSubmitting } = formik;
                    return (
                        <Form>
                            <div className="container-fluid _Home">
                                {showSendProgress && (
                                    <div className="col-md" style={{ marginBottom: "10px" }}>
                                        <ProgressBar animated now={progressResult.percent} label={`${progressResult.percent.toFixed()}%`} />
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
                                                    signatureList={signatureList}
                                                    onTemplateChange={(event) => {
                                                        handleTemplateChange(event.target.value, setFieldValue);
                                                    }}
                                                />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <RichText label={"Body of Email"} id="body" name="body" requiredStar={true} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <CustomButton type="submit" className="btn btn-primary" style={{ float: "right" }}>
                                                    Submit
                                                </CustomButton>
                                                <CustomButton
                                                    className="btn btn-secondary"
                                                    name="btnPreview"
                                                    type="button"
                                                    style={{ float: "right", marginRight: "5px" }}
                                                    onClick={() => {
                                                        handlePreview(values, setSubmitting);
                                                    }}
                                                >
                                                    Preview
                                                </CustomButton>
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
