import { GET } from "../axiosHelper";
import { DELAYED, USE_MOCK_DATA } from "../../constants";

export const getAuthDetails = async () => {
    if (USE_MOCK_DATA) {
        return DELAYED({
            token: true,
            name: "Some User",
        });
    } else {
        var response = await GET(`Auth`);
        return response.data;
    }
};
