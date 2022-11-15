import { GET, POST, PUT } from "../axiosHelper";

export const loadSignatures = async () => {
    var response = await GET(`Signature`);
    return response.data;
};

export const submitSignature = async (data) => {
    var response = await POST(`Signature`, data);
    return response.data;
};

export const updateShareStatus = async (id, value) => {
    var response = await PUT(`Signature`, { id, share: value });
    return response.data;
};
