import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (window.location) {
      switch (window.location.pathname) {
        case "/reports":
          setActiveTab("REPORTS");
          break;
        case "/master-recipients":
          setActiveTab("MASTER_RECIPIENTS");
          break;
        default:
          setActiveTab("HOME");
          break;
      }
    }
  }, []);

  const setItemClass = (tab) => {
    return `sidebar-item ${tab === activeTab ? "selected" : ""}`;
  };

  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li
              className={setItemClass("HOME")}
              onClick={() => {
                setActiveTab("HOME");
              }}
            >
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                aria-expanded="false"
                to="/"
              >
                <i className="mdi mdi-view-dashboard"></i>
                <span className="hide-menu">Manage Email</span>
              </Link>
            </li>
            <li
              className={setItemClass("REPORTS")}
              onClick={() => {
                setActiveTab("REPORTS");
              }}
            >
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/reports"
              >
                <i className="mdi mdi-file"></i>
                <span className="hide-menu">Reports</span>
              </Link>
            </li>
            <li
              className={setItemClass("MASTER_RECIPIENTS")}
              onClick={() => {
                setActiveTab("MASTER_RECIPIENTS");
              }}
            >
              <Link
                className="sidebar-link waves-effect waves-dark sidebar-link"
                to="/master-recipients"
              >
                <i className="mdi mdi-face"></i>
                <span className="hide-menu">Master recipients</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
