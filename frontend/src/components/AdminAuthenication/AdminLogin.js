import React, { useState } from "react";
import loginlogo from "../../images/loginlogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminLoginDetails, setAdminLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChanges = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAdminLoginDetails((previousDate) => ({
      ...previousDate,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        adminLoginDetails
      );
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("adminToken", response.data.token);
        navigate("/adminDashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login-dashboard-full">
      <section className="dashboard-login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-logo-section">
                <img class="login-logo-image" src={loginlogo} alt="" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="dashboard-login-form">
                <h4> ADMIN LOGIN </h4>
                <form method="post" onSubmit={handleSubmit}>
                  <div class="mb-4">
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      aria-describedby="emailHelp"
                      name="email"
                      value={adminLoginDetails.email}
                      onChange={handleInputChanges}
                    />
                  </div>
                  <div class="mb-2">
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      value={adminLoginDetails.password}
                      onChange={handleInputChanges}
                    />
                  </div>

                  <button type="submit" class="btn btn-primary btn-login">
                    {" "}
                    Login{" "}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="social-media-icons">
                <span> FOLLOW </span>
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-x-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
