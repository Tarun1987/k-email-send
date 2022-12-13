import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { Link } from "react-router-dom";

const TAB_NAMES = {
    REPORTS: "REPORTS",
    MASTER_RECIPIENTS: "MASTER_RECIPIENTS",
    TEMPLATES: "TEMPLATES",
    HOME: "HOME",
};

const SideBar = () => {
    const [activeTab, setActiveTab] = useState("");
    const qsData = queryString.parse(window.location.search);

    useEffect(() => {
        if (window.location) {
            switch (window.location.pathname) {
                case "/reports":
                    setActiveTab(TAB_NAMES.REPORTS);
                    break;
                case "/master-recipients":
                    setActiveTab(TAB_NAMES.MASTER_RECIPIENTS);
                    break;
                case "/templates":
                    setActiveTab(TAB_NAMES.TEMPLATES);
                    break;
                case "/signatures":
                    setActiveTab(TAB_NAMES.TEMPLATES);
                    break;
                default:
                    setActiveTab(TAB_NAMES.HOME);
                    break;
            }
        }
    }, []);

    const setItemClass = (tab) => {
        return `sidebar-item ${tab === activeTab ? "selected" : ""}`;
    };

    const getUrl = (path) => {
        return `${path}?name=${qsData.name}&id=${qsData.id}`;
    };

    return (
        <aside className="left-sidebar" data-sidebarbg="skin6">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li
                            className={setItemClass(TAB_NAMES.HOME)}
                            onClick={() => {
                                setActiveTab(TAB_NAMES.HOME);
                            }}
                        >
                            <Link className="sidebar-link waves-effect waves-dark sidebar-link" aria-expanded="false" to={getUrl("/")}>
                                <i className="mdi mdi-email"></i>
                                <span className="hide-menu">Manage Email</span>
                            </Link>
                        </li>
                        <li
                            className={setItemClass(TAB_NAMES.REPORTS)}
                            onClick={() => {
                                setActiveTab(TAB_NAMES.REPORTS);
                            }}
                        >
                            <Link className="sidebar-link waves-effect waves-dark sidebar-link" to={getUrl("/reports")}>
                                <i className="mdi mdi-file-document"></i>
                                <span className="hide-menu">Reports</span>
                            </Link>
                        </li>
                        <li
                            className={setItemClass(TAB_NAMES.MASTER_RECIPIENTS)}
                            onClick={() => {
                                setActiveTab(TAB_NAMES.MASTER_RECIPIENTS);
                            }}
                        >
                            <Link className="sidebar-link waves-effect waves-dark sidebar-link" to={getUrl("/master-recipients")}>
                                <i className="mdi mdi-account-multiple"></i>
                                <span className="hide-menu">Master recipients</span>
                            </Link>
                        </li>
                        <li
                            className={setItemClass(TAB_NAMES.TEMPLATES)}
                            onClick={() => {
                                setActiveTab(TAB_NAMES.TEMPLATES);
                            }}
                        >
                            <Link className="sidebar-link waves-effect waves-dark sidebar-link" to={getUrl("/templates")}>
                                <i className="mdi mdi-file"></i>
                                <span className="hide-menu">Templates</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default SideBar;
