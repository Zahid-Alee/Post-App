import React from "react";
import { useState } from "react";

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <a className="navbar-brand" href="#home">
          My App
        </a>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#dropdown"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#action1">
                  Action 1
                </a>
                <a className="dropdown-item" href="#action2">
                  Action 2
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#action3">
                  Action 3
                </a>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#login">
                <button className=" btn btn-warning text-light">Login</button>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#signup">
                <button className=" btn btn-warning  text-light">
                  Sign Up
                </button>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
