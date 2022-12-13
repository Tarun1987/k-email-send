import { GET, POST, PUT, DELETE } from "../axiosHelper";
import { SIGNATURES_LIST } from "../mock/signatures";
import { USE_MOCK_DATA, DELAYED } from "../../constants";

export const loadSignatures = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED(SIGNATURES_LIST);
    } else {
        var response = await GET(`Signature`);
        return response.data;
    }
};

export const submitSignature = async (data) => {
    var response = await POST(`Signature`, data);
    return response.data;
};

export const updateShareStatus = async (id, value) => {
    if (USE_MOCK_DATA) {
        throw new Error("Something went wrong");
    } else {
        var response = await PUT(`Signature`, { id, share: value });
        return response.data;
    }
};

export const deleteSignatures = async (id) => {
    if (USE_MOCK_DATA) {
        return DELAYED("OK");
    } else {
        var response = await DELETE(`Signature?id=${id}`);
        return response.data;
    }
};
