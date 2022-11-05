import React from "react";
import CustomInput from "../../components/input";
import FileUpload from "../../components/fileUpload";
import CustomSelect from "../../components/select";

const EmailBody = ({ onTemplateChange }) => {
  return (
    <>
      <div className="row">
        <div className="form-group col-md-6">
          <CustomInput
            label={"Email Subject"}
            id="subject"
            name="subject"
            placeholder="Subject"
          />
        </div>
        <div className="form-group col-md-6">
          <CustomInput
            label={"Greetings"}
            id="greetings"
            name="greetings"
            placeholder="Hi !! "
          />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6">
          <CustomSelect
            label={"Select Template"}
            id="bodyTemplate"
            name="bodyTemplate"
            onChange={onTemplateChange}
          />
        </div>
        <div className="form-group col-md-6">
          <FileUpload
            label={"Attachments"}
            id="attachmentFile"
            name="attachmentFile"
          />
        </div>
      </div>
    </>
  );
};

export default EmailBody;
