import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthDetails } from "../services/auth";
import CustomLoader from "../../ui/components/loader";
import { setInfo } from "../../store/userReducer";

const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});
    const qsData = queryString.parse(window.location.search);
    const userInfo = useSelector((state) => state.userInfo.value);

    const dispatch = useDispatch();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        var result = await getAuthDetails(qsData.id);
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
