import React from 'react'
import "./Footer.css"
import footerimagelogo from "../../images/footer-logo.png";
export default function Footer() {
  return (
    <div>
        <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-sm-6 col-md-6">
          <div class="footer-logo">
            <div>
          <img src={footerimagelogo}/>
          </div>
          <p class="footer-text">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        </div>
        <div class="col-lg-1"></div>
        <div class="col-lg-2 col-sm-6 col-md-6">
          <div class="footer-menu-links">
          <h5> Quick Links </h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Home </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Features </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Pricing </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Blog </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Contact </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Last time</a></li>
          </ul>
        </div>
        </div>
        <div class="col-lg-2 col-sm-6 col-md-6">
          <div class="footer-menu-links">
          <h5> Resources </h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Blog </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> About  </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> API Access  </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> FAQ  </a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> Login </a></li>
          </ul>
        </div>
        </div>
        <div class="col-lg-4 col-sm-6 col-md-6">
          <div class="contact-menu-links">
            <div class="footer-menu-links">
            <h5> Contact Us </h5>
            <ul class="list-unstyled text-small">
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">    
                <div class="contact-details">
                  <div class="svg-icons">
              <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/></svg>
            </div>
            <div class="contact-number-details">
              <span class="heading-footer-contact"> Phone Number </span> <br/>
              <span> +91 9684578451 </span>
              </div>
              </div>
               </a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> 
                <div class="contact-details">
                  <div class="svg-icons">

                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/></svg>
                  </div>
            <div class="contact-number-details">
              <span class="heading-footer-contact"> Email </span> <br/>
              <span> ABCD@gmail.com </span>
              </div>
              </div> </a></li>
              <li class="mb-1"><a class="link-secondary text-decoration-none" href="#"> 
                <div class="contact-details">
                  <div class="svg-icons">

                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>
                  </div>
            <div class="contact-number-details">
              <span class="heading-footer-contact"> Location </span> <br/>
              <span> 
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever . </span>
              </div>
              </div>  </a></li>
        
            </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}
