
import React, { useState } from 'react';
import loginlogo from "../../images/loginlogo.png";
import "./Signup.css"


  

function Signup() {
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let isValid = true;
    
        if (!firstName.trim()) {
          errors.firstName = 'First name is required';
          isValid = false;
        }
    
        if (!lastName.trim()) {
          errors.lastName = 'Last name is required';
          isValid = false;
        }
    
        if (!email.trim()) {
          errors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = 'Email address is invalid';
          isValid = false;
        }
    
        setErrors(errors);
        return isValid;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Submit form or perform further actions
          console.log('Form submitted successfully:', { firstName, lastName, email });
        } else {
          console.log('Form has errors');
        }}
    
  return (
    <div className='login-dashboard-full'>
    <section className='dashboard-login'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='dashboard-logo-section'>
                        <img class="login-logo-image" src={loginlogo} alt=""/>
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
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="form-control"
                                    />
                                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                                </div>
                                <div className="col-md-6 mb-2">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                            <button type="submit" class="btn btn-primary btn-login"> REGISTER </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default Signup