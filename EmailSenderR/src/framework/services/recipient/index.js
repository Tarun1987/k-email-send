import { GET, PUT, MAP_URL, POST_FILE } from "../axiosHelper";

export const loadRecipients = async (templateName, includeInactive = false) => {
    var response = await GET(`Recipients/GetByName?name=${templateName}&includeInactive=${includeInactive}`);
    return response.data;
};

export const getRecipientsMaster = async () => {
    var response = await GET(`Recipients`);
    return response.data;
};

export const updateRecipient = async (data) => {
    var response = await PUT(`Recipients`, data);
    return response.data;
};

export const getMasterDownloadURL = () => {
    return MAP_URL("Recipients/DownloadMaster");
};

export const uploadRecipients = async (data) => {
    var response = await POST_FILE(`Recipients`, data);
    return response.data;
};
