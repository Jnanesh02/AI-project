import React, { useState } from "react";
import loginlogo from "../../images/loginlogo.png";
import "./Login.css"; // You can create Login.css file for styling if needed
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login/customer`,
        {
          email,
          password,
        }
      );
      // Assuming your backend returns a token upon successful login
      // You can store the token in localStorage or a state management system like Redux
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard or any other page after successful login
      navigate("/dashboard/account");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-dashboard-full">
      <section className="dashboard-login">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard-logo-section">
                <img className="login-logo-image" src={loginlogo} alt="" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="dashboard-login-form">
                <h4>LOGIN</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="form-control"
                    />
                  </div>
                  {error && <p className="error">{error}</p>}
                  <button type="submit" className="btn btn-primary btn-login">
                    {" "}
                    LOGIN{" "}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
