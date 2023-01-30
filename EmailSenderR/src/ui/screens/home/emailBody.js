import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../components/input";
import FileUpload from "../../components/fileUpload";
import CustomSelect from "../../components/select";

const EmailBody = ({ onTemplateChange, templateList, recipientList, classificationList, signatureList }) => {
    return (
        <>
            <div className="row">
                <div className="form-group col-md-3">
                    <CustomSelect
                        options={recipientList}
                        label={"Select Recipient"}
                        id="selectedRecipient"
                        name="selectedRecipient"
                        requiredStar={true}
                    />
                </div>
                <div className="form-group col-md-3">
                    <CustomSelect
                        options={templateList}
                        label={"Select Template"}
                        id="selectedTemplate"
                        name="selectedTemplate"
                        onChange={onTemplateChange}
                    />
                </div>
                <div className="form-group col-md-2">
                    <CustomSelect
                        options={classificationList}
                        label={"Email Classification"}
                        id="classification"
                        name="classification"
                        requiredStar={true}
                    />
                </div>
                <div className="form-group col-md-2">
                    <CustomSelect options={signatureList} label={"Signature"} id="signature" name="signature" />
                </div>
                <div className="form-group col-md-2">
                    <FileUpload label={"Attachment File"} id="attachmentFile" name="attachmentFile" multiple={true} />
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-8">
                    <CustomInput label={"Email Subject"} id="subject" name="subject" requiredStar={true} />
                </div>
                <div className="form-group col-md-4">
                    <CustomInput
                        label={"Greetings"}
                        id="greetings"
                        name="greetings"
                        requiredStar={true}
                        infoIcon={
                            <OverlayTrigger
                                key={"tooltip"}
                                placement={"top"}
                                overlay={
                                    <Tooltip id={`tooltip`}>
                                        Dont write <strong>Name</strong> here.
                                    </Tooltip>
                                }
                            >
                                <i className="mdi mdi-information"></i>
                            </OverlayTrigger>
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default EmailBody;
