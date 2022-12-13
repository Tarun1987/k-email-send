import { GET } from "../axiosHelper";
import { DELAYED, USE_MOCK_DATA } from "../../constants";

export const getAuthDetails = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED({
            allowAccess: true,
            name: "Karteek",
        });
    } else {
        var response = await GET(`Auth`);
        return response.data;
    }
};
