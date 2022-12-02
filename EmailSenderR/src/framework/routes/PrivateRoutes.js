import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthDetails } from "../services/auth";
import CustomLoader from "../../ui/components/loader";
import { setInfo } from "../../store/userReducer";

const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        var result = await getAuthDetails();
        if (result) {
            setAuth(result);
            setLoading(false);
            dispatch(setInfo(result));
        }
    };

    return loading ? (
        <div className="container-fluid _Home">
            <CustomLoader />
        </div>
    ) : auth.allowAccess ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" />
    );
};

export default PrivateRoutes;
