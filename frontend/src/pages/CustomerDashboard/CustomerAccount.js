import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CustomerDashboardStyles/CustomerAccount.css'
const CustomerAccount = () => {
  const navigate = useNavigate();
  document.addEventListener('DOMContentLoaded',function(){
  const form = document.getElementById('youtubeForm');
       form.addEventListener('submit', function(event){
        event.preventDefault();
        console.log(event);
        navigate("/customerDetails");
       });
  });
  return (
    <div>
      <ul className="social-icons">
      {/* <li>
        <NavLink to="#" className="facebook">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          
          <i class="fa-brands fa-facebook" aria-hidden="true"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="twitter">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fa-brands fa-twitter" aria-hidden="true"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="#" className="instagram">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fa-brands fa-instagram" aria-hidden="true"></i>
        </NavLink>
      </li> */}
  <i class="fa-brands fa-youtube" aria-hidden="true"></i>
  <form id="youtubeForm" action="http://localhost:3000/auth/youtube" method="get">
    <input type="submit" placeholder='Sign with YouTube'/>
  </form>
    </ul>
    </div>
  )
}

export default CustomerAccount
