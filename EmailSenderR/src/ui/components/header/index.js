import React from "react";
import LogoIcon from "./images/logo-icon.png";
import LogoTextIcon from "./images/logo-text.png";
import LogoLightIcon from "./images/logo-light-icon.png";
import LogoLightText from "./images/logo-light-text.png";
import LogoProfileIcon from "./images/profile.png";

const Header = () => {
  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        <div className="navbar-header" data-logobg="skin6">
          <a className="navbar-brand" href="/">
            <b className="logo-icon">
              <img src={LogoIcon} alt="homepage" className="dark-logo" />
              <img src={LogoLightIcon} alt="homepage" className="light-logo" />
            </b>

            <span className="logo-text">
              <img src={LogoTextIcon} alt="homepage" className="dark-logo" />
              <img src={LogoLightText} className="light-logo" alt="homepage" />
            </span>
          </a>
          <a className="nav-toggler waves-effect waves-light d-block d-md-none">
            <i className="mdi mdi-menu"></i>
          </a>
        </div>
        <div
          className="navbar-collapse collapse"
          id="navbarSupportedContent"
          data-navbarbg="skin5"
        >
          <ul className="navbar-nav float-start me-auto"></ul>
          <ul className="navbar-nav float-end">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle text-muted">
                Welcome! Karteek
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={LogoProfileIcon}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
