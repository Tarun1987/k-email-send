import { GET } from "../axiosHelper";
import { DELAYED, USE_MOCK_DATA } from "../../constants";
import { REPORTS, REPORTS_COUNT } from "../mock/reports";

export const loadEmailHistory = async (page) => {
    if (USE_MOCK_DATA) {
        return DELAYED(REPORTS);
    } else {
        var response = await GET(`Reports?page=${page || 1}`);
        return response.data;
    }
};

export const getTotalHistoryCount = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED(REPORTS_COUNT);
    } else {
        var response = await GET(`Reports/GetTotalCount`);
        return response.data;
    }
};
