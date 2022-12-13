import { GET } from "../axiosHelper";
import { DELAYED, USE_MOCK_DATA } from "../../constants";

export const getAuthDetails = async (id) => {
    if (USE_MOCK_DATA) {
        return DELAYED({
            allowAccess: id == 1,
            name: "Karteek",
            id,
        });
    } else {
        var response = await GET(`Auth?id=${id}`);
        return response.data;
    }
};
