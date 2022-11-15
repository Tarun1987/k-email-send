import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ activeTab, children }) => {
  return (
    <div className="page-breadcrumb">
      <div className="row align-items-center">
        <div className="col-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 d-flex align-items-center">
              <li className="breadcrumb-item">
                <Link to="/" className="link">
                  <i className="mdi mdi-home-outline fs-4"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {activeTab}
              </li>
            </ol>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BreadCrumb;
