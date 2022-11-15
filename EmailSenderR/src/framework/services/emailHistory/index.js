import { GET } from "../axiosHelper";

export const loadEmailHistory = async (page) => {
    var response = await GET(`Reports?page=${page || 1}`);
    return response.data;
};

export const getTotalHistoryCount = async () => {
    var response = await GET(`Reports/GetTotalCount`);
    return response.data;
};
