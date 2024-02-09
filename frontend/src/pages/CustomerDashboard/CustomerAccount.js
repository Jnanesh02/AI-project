import React from 'react'
import { NavLink } from 'react-router-dom'
import './CustomerDashboardStyles/CustomerAccount.css'
const CustomerAccount = () => {
  return (
    <div>
      <ul className="social-icons">
      <li>
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
      </li>
      <li>
        <NavLink to="#" className="youtube">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <i class="fa-brands fa-youtube" aria-hidden="true"></i>
        </NavLink>
      </li>
    </ul>
    </div>
  )
}

export default CustomerAccount
