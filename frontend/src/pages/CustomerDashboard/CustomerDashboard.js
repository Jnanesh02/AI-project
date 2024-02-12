import React,{useEffect} from 'react'
import "./CustomerDashboardStyles/Dashboard.css"
import headerlogo from "../../images/header-logo.png";
import { NavLink, Outlet } from "react-router-dom";
import axios from 'axios';


const CustomerDashboard = () => {
  useEffect(() =>{
    getChannelId()
  },[]);
  const getChannelId= async () =>{
    try {
      const response = await axios.get("http://localhost:3000/dashboard");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
      <header>
        <section class="Customer-header-section">
          <div class="container">
            <div class="row header-bg-clr">
              <div class="col-lg-2">
                <div class="header-logo">
                  <img src={headerlogo} alt="" />
                </div>
              </div>
              <div class="col-lg-7">
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                  <div class="container-fluid">
                    {/* <a class="navbar-brand" href="/">Navbar</a> */}
                    <button
                      class="navbar-toggler navbar-tgl-btn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 navbar-media">
                        <li class="nav-item">
                          <NavLink
                            to="/dashboard"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Dasboard 
                          </NavLink>
                        </li>
                        <li class="nav-item">
                          <NavLink
                            to="Account"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Account 
                          </NavLink>
                        </li>
                        <li class="nav-item">
                          <NavLink
                            to="Blog"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
                            Blog
                          </NavLink>
                        </li>
                        <li class="nav-item">
                          <NavLink
                            to="Subscription"
                            exact
                            className="nav-link"
                            activeClassName="active"
                          >
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
                  {/* <button class="btn btn-primary login">
                  <NavLink to="/Login" class="btn btn-primary login">
                    {" "}
                    Login{" "}
                  </NavLink>
                  </button> */}
                  
                   <NavLink to="/Login" className="btn btn-custom login">
                   Login
                  </NavLink>
                   <NavLink to="/Signup" className="btn btn-custom login">
                    Signup
                   </NavLink>
                  
                  
                </div>
              </div>
            </div>
            <NavLink to="/Signup" className="btn btn-custom-signup signup">
                    Logout
                   </NavLink>
          </div>
        </section>
      </header>
      <h3 className='m-4'>CustomerDashboard</h3>
    </div>
    <Outlet/>
    </div>
  )
}

export default CustomerDashboard
