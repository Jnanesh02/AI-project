
import React, { useState } from "react";
import loginlogo from "../../images/loginlogo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      newErrors.confirmPassword = "confirmPassword is required";
    } else if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number is invalid";
    }

    setErrors(newErrors);
    // Check if there are any errors, if yes, return false, else true
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form or perform further actions
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup/customer`,
        formData
      );
      // Navigate to login page
      navigate("/Login");
      console.log("Form submitted successfully:", {
        formData,
      });
    } else {
      console.log("Form has errors");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
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
                <h4>CREATE ACCOUNT</h4>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                      {errors.firstName && (
                        <p className="error">{errors.firstName}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                      {errors.lastName && (
                        <p className="error">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="password">Password:</label>
                      <div className="password-input">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="toggle-password"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="confirmPassword">Confirm password:</label>
                      <div className="password-input">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="toggle-password"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="error">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="mobileNumber">Mobile Number:</label>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                    {errors.mobileNumber && (
                      <p className="error">{errors.mobileNumber}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-login">
                    {" "}
                    REGISTER{" "}
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

export default Signup;
