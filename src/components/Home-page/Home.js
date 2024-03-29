import React from 'react'
import "./home.css"
import headerlogo from "../../images/header-logo.png"
export default function Home() {
  return (
    <div>
         <header>
    <section class="header-section">
        <div class="container">
            <div class="row header-bg-clr">
                <div class="col-lg-2">
                    <div class="header-logo">
                    <img src={headerlogo}/>
                    </div>
                </div>
                <div class="col-lg-7">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                         {/* <a class="navbar-brand" href="#">Navbar</a> */}
                          <button class="navbar-toggler navbar-tgl-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 navbar-media">
                              <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#"> Features </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#"> Pricing </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#"> Blog </a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" href="#"> Contact Us </a>
                              </li>
                            </ul>
                       
                          </div>
                        </div>
                      </nav>
                </div>
                <div class="col-lg-3">
                    <div class="login-details">
                    <button type="button" class="btn btn-primary login"> Login </button>
                    <button type="button" class="btn btn-primary signup"> Signup </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="header-heading">
                        "Streamline Your Social  media Engagement"
                    </h1>
                    <div class="get-started-btn">
                        <button class="btn btn-primary"> Get Started </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
   </header>
    </div>
  )
}
