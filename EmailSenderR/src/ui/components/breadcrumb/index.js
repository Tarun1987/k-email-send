import React from "react";

const BreadCrumb = ({ activeTab }) => {
  return (
    <div className="page-breadcrumb">
      <div className="row align-items-center">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 d-flex align-items-center">
              <li className="breadcrumb-item">
                <a href="/" className="link">
                  <i className="mdi mdi-home-outline fs-4"></i>
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {activeTab}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
