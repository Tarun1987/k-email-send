import React from "react";
import CustomInput from "../../components/input";
import FileUpload from "../../components/fileUpload";
import CustomSelect from "../../components/select";

const EmailBody = ({ onTemplateChange, templateList, recipientList, classificationList, signatureList }) => {
    return (
        <>
            <div className="row">
                <div className="form-group col-md-3">
                    <CustomSelect options={recipientList} label={"Select Recipient"} id="selectedRecipient" name="selectedRecipient" />
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
                    <CustomSelect options={classificationList} label={"Email Classification"} id="classification" name="classification" />
                </div>
                <div className="form-group col-md-2">
                    <CustomSelect options={signatureList} label={"Signature"} id="signature" name="signature" />
                </div>
                <div className="form-group col-md-2">
                    <FileUpload label={"Attachment File"} id="attachmentFile" name="attachmentFile" />
                </div>
            </div>

            <div className="row">
                <div className="form-group col-md-8">
                    <CustomInput label={"Email Subject"} id="subject" name="subject" />
                </div>
                <div className="form-group col-md-4">
                    <CustomInput label={"Greetings"} id="greetings" name="greetings" />
                </div>
            </div>
        </>
    );
};

export default EmailBody;
