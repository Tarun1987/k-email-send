import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoIcon from "./images/logo-icon.png";
import LogoProfileIcon from "./images/profile.png";

const Header = () => {
    const userInfo = useSelector((state) => state.userInfo.value);
    return (
        <header className="topbar" data-navbarbg="skin6">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark bg-dark box-shadow">
                <div className="navbar-header" style={{ background: "none", border: 0, color: "white" }}>
                    <a className="navbar-brand" href="/">
                        <b className="logo-icon">
                            <img src={LogoIcon} alt="homepage" className="dark-logo" />
                        </b>

                        <strong className="logo-text">Flexi Lite</strong>
                    </a>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav float-start me-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted">Tab 1</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted">Tab 2</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav float-end">
                        <li className="nav-item dropdown" style={{ borderRight: "1px solid #777e89" }}>
                            <Link target={"_blank"} to={"/help"} className="nav-link dropdown-toggle">
                                <i className="mdi mdi-help"></i>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted">Welcome! {userInfo ? userInfo.name : ""}</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img src={LogoProfileIcon} alt="user" className="rounded-circle" width="31" />
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
