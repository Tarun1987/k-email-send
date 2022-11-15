import { POST, GET } from "../axiosHelper";

export const loadEmailSendProgress = async (uniqueId) => {
    var response = await GET(`EmailSend/GetProgress?uniqueId=${uniqueId}`);
    return response.data;
};

export const submitEmailData = async (data) => {
    var response = await POST(`EmailSend`, data);
    return response.data;
};

export const getClassificationMaster = async () => {
    return [
        { key: 1, value: "Classification 1" },
        { key: 2, value: "Classification 2" },
    ];
};
