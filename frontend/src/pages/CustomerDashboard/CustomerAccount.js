import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboardStyles/CustomerAccount.css";
import PersonalisationForm from "./Personalisation";
const CustomerAccount = () => {
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
    return (
      <>
        <form
          id="youtubeForm"
          action="http://localhost:3000/auth/youtube"
          method="get">
          <button type="submit">
            <i class="fa-brands fa-youtube mx-2" aria-hidden="true"></i>
            sign in with youtube
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
    <div>
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
          {/* <form
          id="youtubeForm"
          action="http://localhost:3000/auth/youtube"
          method="get">
          <button type="submit">
            <i class="fa-brands fa-youtube mx-2" aria-hidden="true"></i>
            sign in with youtube
          </button>
        </form> */}

          <SignInWithYoutube></SignInWithYoutube>
        </ul>
      </div>
      <CreateAssistant></CreateAssistant>
    </div>
  );
};

export default CustomerAccount;
