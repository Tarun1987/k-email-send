import { GET } from "../axiosHelper";
import { DELAYED, USE_MOCK_DATA } from "../../constants";

export const getAuthDetails = async (id) => {
    if (USE_MOCK_DATA) {
        return DELAYED({
            allowAccess: true,
            name: "Karteek",
            id: "BOII5FUynjpl5RZJJ8nW1g",
        });
    } else {
        var response = await GET(`Auth?id=${id}`);
        return response.data;
    }
};
