import loginlogo from "../../images/loginlogo.png";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password validation criteria (e.g., minimum length)
    return password.length >= 8;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if email and password are empty
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and  password.');
      return;
    }
  
    // Perform additional form submission logic here
    if (isEmailValid && isPasswordValid) {
      // Submit the form
      alert("form submitted successfully")
      console.log('Form submitted successfully');
    } else {
      // Show error messages or handle invalid form
      console.log('Form submission failed. Please check your inputs.');
      alert('Form submission failed. Please check your inputs.');
    }
  };
  
   return (
    <div className='login-dashboard-full'>
      <section className='dashboard-login'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='dashboard-logo-section'>
                <img className="login-logo-image" src={loginlogo} alt=""/>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='dashboard-login-form'>
                <h4> USER LOGIN </h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder='enter your Email'
                      value={email}
                      onChange={handleEmailChange}
                      style={{ borderColor: isEmailValid ? 'initial' : 'red' }}
                      aria-describedby="emailHelp"
                    />
                    {!isEmailValid && <p style={{ color: 'red' }}>Please enter a valid email address</p>}
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder='Password'
                      value={password}
                      onChange={handlePasswordChange}
                      style={{ borderColor: isPasswordValid ? 'initial' : 'red' }}
                    />
                    {!isPasswordValid && <p style={{ color: 'red' }}>Password must be at least 8 characters long</p>}
                  </div>
                  <div className='login-accounts'>
                    <Link to="/Signup"><button> Create Account </button></Link>
                    <Link to="/Forgot"><button> Forgot password </button></Link>
                  </div>
                  <button type="submit" className="btn btn-primary btn-login"> Login </button>
                </form>
              </div>
            </div>
            <div className='col-lg-12'>
              <div className='social-media-icons'>
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
}

export default Login;

