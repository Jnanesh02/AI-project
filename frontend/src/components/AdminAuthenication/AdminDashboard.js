import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./AdminStyles/Dashboard.css";
import headerlogo from "../../images/header-logo.png";

export const AdminDashboard = () => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  useEffect(() => {
    const handleSidebarToggle = () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        sidebar.classList.toggle("active");
      }
    };

    const sidebarCollapseButton = document.getElementById("sidebarCollapse");
    if (sidebarCollapseButton) {
      sidebarCollapseButton.addEventListener("click", handleSidebarToggle);
    }

    return () => {
      if (sidebarCollapseButton) {
        sidebarCollapseButton.removeEventListener("click", handleSidebarToggle);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/AdminLogin"); // Use navigate function for navigation
  };

  return (
    <div>
      <div />
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        <nav id="sidebar">
          <div className="sidebar-header">
            <img className="dashboard-logo" src={headerlogo} alt="" />
          </div>

          <ul className="list-unstyled components">
            <NavLink style={{ textDecoration: "none" }} to="/Admindashboard">
              <p>
                <svg
                  className="dashborad-icons"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
                </svg>
                Dashboard{" "}
              </p>
            </NavLink>

            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <button
                    className="accordion-button custom-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#masterDropdown"
                    aria-expanded="true"
                    aria-controls="masterDropdown"
                  >
                    Masters
                  </button>
                </h2>
                <div
                  id="masterDropdown"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne2"
                  data-bs-parent="#accordionExample2"
                >
                  <div className="accordion-body">
                    <h2 className="accordion-header" id="headingOne2">
                      <NavLink
                        className="accordion-button custom-button"
                        to="Masters1"
                      >
                        Masters1
                      </NavLink>
                    </h2>
                  </div>
                  <div className="accordion-body">
                    <h2 className="accordion-header" id="headingOne2">
                      <NavLink
                        className="accordion-button custom-button"
                        to="Masters2"
                      >
                        Masters2
                      </NavLink>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <NavLink
                    className="accordion-button custom-button"
                    to="customerDetails"
                  >
                    Customer Management
                  </NavLink>
                </h2>
              </div>
            </div>

            <div className="accordion" id="accordionExample2">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne2">
                  <button
                    onClick={handleLogout}
                    className="accordion-button custom-button"
                    type="button"
                  >
                    Logout
                  </button>
                </h2>
              </div>
            </div>
          </ul>
        </nav>

        {/* <!-- Page Content  --> */}
        <div id="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
