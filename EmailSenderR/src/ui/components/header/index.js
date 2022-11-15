import React from "react";
import LogoIcon from "./images/logo-icon.png";
import LogoTextIcon from "./images/logo-text.png";
import LogoLightIcon from "./images/logo-light-icon.png";
import LogoLightText from "./images/logo-light-text.png";
import LogoProfileIcon from "./images/profile.png";

const Header = () => {
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
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-muted">Welcome! Karteek</a>
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
