import { GET, PUT, MAP_URL, POST_FILE } from "../axiosHelper";
import { RECIPIENT_LIST, RECIPIENT_MASTER } from "../mock/recipients";
import { USE_MOCK_DATA, DELAYED } from "../../constants";

export const loadRecipients = async (templateName, includeInactive = false) => {
    if (USE_MOCK_DATA) {
        return DELAYED(RECIPIENT_LIST, 10);
    } else {
        var response = await GET(`Recipients/GetByName?name=${templateName}&includeInactive=${includeInactive}`);
        return response.data;
    }
};

export const getRecipientsMaster = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED(RECIPIENT_MASTER);
    } else {
        var response = await GET(`Recipients`);
        return response.data;
    }
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
