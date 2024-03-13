import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboardStyles/CustomerAccount.css";
import PersonalisationForm from "./Personalisation";
import { Dashboard } from "./Dashboard";
const CustomerAccount = () => {
  const [linked, setLinked] = useState(true);
  const navigate = useNavigate();
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("youtubeForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log(event);
      navigate("/customerDetails");
    });
  });

  const SignInWithYoutube = () => {
    const token = localStorage.getItem("token");
    const tokenData = JSON.parse(atob(token.split(".")[1]));
    return (
      <>
        <form
          id="youtubeForm"
          action="http://localhost:3000/auth/youtube"
          method="get">
          <input type="hidden" name="id" value={tokenData.userId}></input>
          <button type="submit" class="btn btn-primary youtube-btn">
            <i class="fa-brands fa-youtube mx-2" aria-hidden="true"></i>
            Link your Youtube account
          </button>
        </form>
      </>
    );
  };
  const CreateAssistant = () => {
    return (
      <>
        <PersonalisationForm />
      </>
    );
  };
  return (
    <div className="container">
      <div className="row">
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
          {/* <form
          id="youtubeForm"
          action="http://localhost:3000/auth/youtube"
          method="get">
          <button type="submit">
            <i class="fa-brands fa-youtube mx-2" aria-hidden="true"></i>
            sign in with youtube
          </button>
        </form> */}
        </ul>
        <CreateAssistant></CreateAssistant>
        {linked && <SignInWithYoutube></SignInWithYoutube>}
        {/* <Dashboard></Dashboard> */}
      </div>
    </div>
  );
};

export default CustomerAccount;
