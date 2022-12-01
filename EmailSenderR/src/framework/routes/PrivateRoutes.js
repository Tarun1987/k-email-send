import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthDetails } from "../services/auth";
import CustomLoader from "../../ui/components/loader";

const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        var result = await getAuthDetails();
        if (result) {
            setAuth(result);
            setLoading(false);
        }
    };

    return loading ? (
        <div className="container-fluid _Home">
            <CustomLoader />
        </div>
    ) : auth.token ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" />
    );
};

export default PrivateRoutes;
