

import React, { useState } from 'react';
import loginlogo from "../../images/loginlogo.png";
import "./Signup.css";
import {useNavigate} from 'react-router-dom';


function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({});
    const  navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            newErrors.confirmPassword = 'confirmPassword is required';
        } else if (password.trim().length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          newErrors.password = 'Password must contain at least one special character';
      }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Mobile number is invalid';
        }

        setErrors(newErrors);
        // Check if there are any errors, if yes, return false, else true
        return Object.keys(newErrors).length === 0;
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        clearError('firstName');
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        clearError('lastName');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        clearError('email');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        clearError('password');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        clearError('confirmPassword');
    };

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
        clearError('mobileNumber');
    };

    const clearError = (fieldName) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit form or perform further actions
            // Navigate to login page
            navigate('/Login');
            console.log('Form submitted successfully:', { firstName, lastName, email, password, mobileNumber });
        } else {
            console.log('Form has errors');
        }
    };

    return (
        <div className='login-dashboard-full'>
            <section className='dashboard-login'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className='dashboard-logo-section'>
                                <img className="login-logo-image" src={loginlogo} alt="" />
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='dashboard-login-form'>
                                <h4>CREATE ACCOUNT</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="firstName">First Name:</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                value={firstName}
                                                onChange={handleFirstNameChange}
                                                className="form-control"
                                            />
                                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="lastName">Last Name:</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                value={lastName}
                                                onChange={handleLastNameChange}
                                                className="form-control"
                                            />
                                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className="form-control"
                                        />
                                        {errors.email && <p className="error">{errors.email}</p>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className="form-control"
                                            />
                                            {errors.password && <p className="error">{errors.password}</p>}
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="confirmPassword">Confirm Password:</label>
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                className="form-control"
                                            />
                                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="mobileNumber">Mobile Number:</label>
                                        <input
                                            type="text"
                                            id="mobileNumber"
                                            value={mobileNumber}
                                            onChange={handleMobileNumberChange}
                                            className="form-control"
                                        />
                                        {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-login"> REGISTER </button>
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
