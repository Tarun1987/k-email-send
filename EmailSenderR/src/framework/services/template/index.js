import { GET, POST, PUT } from "../axiosHelper";

export const loadTemplates = async () => {
    var response = await GET(`Templates`);
    return response.data;
};

export const submitTemplate = async (data) => {
    var response = await POST(`Templates`, data);
    return response.data;
};

export const updateShareStatus = async (id, value) => {
    var response = await PUT(`Templates`, { id, share: value });
    return response.data;
};
