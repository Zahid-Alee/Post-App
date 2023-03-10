import React, { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar(props) {
  const [expanded, setExpanded] = useState(false);

  const checkUser = useContext(AuthContext);

  // const Logout=()=>{}
  const navigate = useNavigate();
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <span className="navbar-brand" href="#home">
          My App
        </span>
        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="nav-link" href="#home">
                Home
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link" href="#about">
                About
              </span>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                href="#dropdown"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="dropdown-divider"></div>
              </div>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              {checkUser() ? (
                <button
                  className=" btn btn-warning  text-light"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                    console.log("logout");
                  }}
                >Logout</button>
              ) : (
                <button className="btn  btn-warning text-light" onClick={()=>{
                  navigate('/signup')
                }}>SignUp</button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
