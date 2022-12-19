import React from "react";
import queryString from "query-string";
import CustomLoader from "../components/loader";
import { Link } from "react-router-dom";
import "./style/Layout.css";

const Layout = ({ children, activeTab, isLoading }) => {
    const qsData = queryString.parse(window.location.search);

    const getUrl = (path) => {
        return `${path}?id=${qsData.id}`;
    };

    return (
        <div className="_SignTemplateLayout">
            <div className="container-fluid">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTab === "Templates" ? "active" : ""}`} to={getUrl("/templates")}>
                            Templates
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${activeTab === "Signatures" ? "active" : ""}`} to={getUrl("/signatures")}>
                            Signatures
                        </Link>
                    </li>
                </ul>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-body" style={{ position: "relative" }}>
                            {isLoading && <CustomLoader />}
                            <div className="d-md-flex align-items-center">
                                <div className="table-responsive" style={{ width: "100%" }}>
                                    {children}
                                </div>
                            </div>
                        </div>
                        <div className="amp-pxl mt-4" style={{ height: "350px" }}>
                            <div className="chartist-tooltip"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
