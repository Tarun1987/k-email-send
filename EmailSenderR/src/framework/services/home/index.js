import { POST, GET, POST_FILE } from "../axiosHelper";
import { USE_MOCK_DATA, DELAYED } from "../../constants";
import { CLASSIFICATION_LIST, SUBMIT_EMAIL } from "../mock/home";

const submitAttachment = async (data) => {
    if (USE_MOCK_DATA) {
        return DELAYED({ status: "OK", attachmentFile: "attachmentFile ... " });
    } else {
        var response = await POST_FILE(`EmailSend/submitAttachment`, data);
        return response.data;
    }
};

export const loadEmailSendProgress = async (uniqueId, progressPercent) => {
    if (USE_MOCK_DATA) {
        return DELAYED(
            {
                completed: SUBMIT_EMAIL.TotalCount * (progressPercent / 100) + 1,
            },
            2000
        );
    } else {
        var response = await GET(`EmailSend/GetProgress?uniqueId=${uniqueId}`);
        return response.data;
    }
};

export const submitEmailData = async (data) => {
    if (USE_MOCK_DATA) {
        return DELAYED(SUBMIT_EMAIL, 2000);
    } else {
        if (data.attachmentFile) {
            const formData = new FormData();
            for (let i = 0; i < data.attachmentFile.length; i++) {
                const file = data.attachmentFile[i];
                formData.append(`file-${i}`, file);
            }
            var result = await submitAttachment(formData);
            if (result.status === "OK") {
                data.attachmentFiles = result.attachmentFiles;
            } else {
                return "FAIL";
            }
        }

        delete data.attachmentFile;
        var response = await POST(`EmailSend`, data);
        return response.data;
    }
};

export const getClassificationMaster = async () => {
    return DELAYED(CLASSIFICATION_LIST);
};

export const previewEmailData = async (data) => {
    if (USE_MOCK_DATA) {
        return DELAYED({ status: "OK", previewData: "this is result from server" });
    } else {
        var response = await POST(`EmailSend/previewEmailData`, data);
        return response.data;
    }
};
