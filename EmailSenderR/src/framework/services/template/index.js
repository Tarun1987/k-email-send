import { GET, POST, PUT } from "../axiosHelper";
import { TEMPLATES_LIST } from "../mock/templates";
import { USE_MOCK_DATA, DELAYED } from "../../constants";

export const loadTemplates = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED(TEMPLATES_LIST);
    } else {
        var response = await GET(`Templates`);
        return response.data;
    }
};

export const submitTemplate = async (data) => {
    var response = await POST(`Templates`, data);
    return response.data;
};

export const updateShareStatus = async (id, value) => {
    var response = await PUT(`Templates`, { id, share: value });
    return response.data;
};

export const deleteTemplate = async (data) => {
    if (USE_MOCK_DATA) {
        return DELAYED("OK");
    } else {
        var response = await GET(`Templates`);
        return response.data;
    }
};
