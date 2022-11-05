import React from "react";
import FileUpload from "../../components/fileUpload";
import CustomToggleButton from "../../components/toggleButton";

const UploadRecipients = ({ recipientsTemplate }) => {
  const radios = [
    { name: "Default", value: "default" },
    { name: "New", value: "new" },
  ];

  return (
    <div className="col-md-12 upload-panel-container">
      <div id="recipients-box-panel" className="box-panel panel panel-default">
        <div className="download-template">
          <CustomToggleButton
            id="recipientsTemplate"
            label={"Choose Template"}
            name={"recipientsTemplate"}
            options={radios}
          />
        </div>
        <div className="panel-body vertical-center text-center file-upload-container">
          {recipientsTemplate === radios[1].value ? (
            <FileUpload
              label={"Recipient File"}
              id="recipientFile"
              name="recipientFile"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          ) : (
            <span href="none" className="download-recipients">
              Download list
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadRecipients;
