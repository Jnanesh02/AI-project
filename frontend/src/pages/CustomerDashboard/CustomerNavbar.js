import React from "react";
import headerlogo from "../../images/header-logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export const CustomerNavbar = () => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem("token");
  const navigate = useNavigate();

  const Logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/Login");
  };

  return (
    <>
      <header>
        <section className="Customer-header-section">
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
                      aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 navbar-media">
                        <li className="nav-item">
                          <NavLink
                            to="/dashboard"
                            exact
                            className="nav-link"
                            activeClassName="active">
                            Dashboard
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="Account"
                            exact
                            className="nav-link"
                            activeClassName="active">
                            Account
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="Blog"
                            exact
                            className="nav-link"
                            activeClassName="active">
                            Blog
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/Pricing"
                            exact
                            className="nav-link"
                            activeClassName="active">
                            Subscription
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
                      onClick={Logout}
                      className="btn btn-custom-signup signup">
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
          </div>
        </section>
      </header>
    </>
  );
};
