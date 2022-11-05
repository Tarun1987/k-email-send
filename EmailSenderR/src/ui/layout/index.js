import React from "react";
import Header from "../components/header";
import SideBar from "../components/sidebar";
import "./style/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="_Layout">
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        <Header />
        <SideBar />
        <div className="page-wrapper">
          {children}
          <footer className="footer text-center">
            <p>&copy; {new Date().getFullYear()} - Footer</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
