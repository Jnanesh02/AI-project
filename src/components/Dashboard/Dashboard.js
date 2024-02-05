import React from 'react'
import loginlogo from "../../images/loginlogo.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/twitter.png";
import youtube from "../../images/youtube.png";

import "./Dashboard.css"
export const Dashboard = () => {
  return (
  <div className='login-dashboard-full'>
    <section className='dashboard-login'>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='dashboard-logo-section'>
                    <img class="login-logo-image" src={loginlogo}/>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='dashboard-login-form'>
                        <h4> USER LOGIN </h4>
                <form>
  <div class="mb-4">
    <input type="email" class="form-control" id="exampleInputEmail1" placeholder='Username or Mail Id' aria-describedby="emailHelp"/>
  </div>
  <div class="mb-2">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Password'/>
  </div>
 <div className='login-accounts'>
  <label> Create Account </label>
  <label> Forgot Password </label>
 </div>
  <button type="submit" class="btn btn-primary btn-login"> Login </button>
</form>
</div>
                </div>
                <div className='col-lg-12'>
                    <div className='social-media-icons'>
                      <span>  FOLLOW </span>
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-x-twitter"></i>
                    <i class="fa-brands fa-youtube"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
  )
}
