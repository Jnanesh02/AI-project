import React from "react";
import "./home.css";
import headerlogo from "../../images/header-logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/Login"); // Redirect to login page
  };

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div>
      <header>
        <section className="header-section">
          <div className="container">
            <div className="row header-bg-clr">
              <div className="col-lg-2">
                <div className="header-logo">
                  <img src={headerlogo} alt="" />
                </div>
              </div>
              <div className="col-lg-7">
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                  <div className="container-fluid">
                    <button
                      className="navbar-toggler navbar-tgl-btn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 navbar-media">
                        <li className="nav-item">
                          <NavLink
                            to="/Features"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Features
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/Pricing"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Pricing
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/Blog"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Blog
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/Contact-Us"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Contact Us
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-lg-3">
                <div className="login-details">
                  {isLoggedIn ? (
                    <button
                      className="btn btn-custom login"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <NavLink to="/Login" className="btn btn-custom login">
                        Login
                      </NavLink>
                      <NavLink to="/Signup" className="btn btn-custom login">
                        Signup
                      </NavLink>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="header-heading">
                  "Your Digital Dream Team: Elevating YouTube Interactions with
                  AI"
                </h1>
                <div className="get-started-btn">
                  <button className="btn btn-primary"> Get Started </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
}
