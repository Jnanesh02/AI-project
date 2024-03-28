import React, { useEffect, useState } from "react";
import "./Pricing.css";
import axios from "axios";

// const pricingData = [
//   {
//     type: " Basic Plan",
//     price: "0$",
//     duration: "30 days",
//     features: [
//       "Ad Free Experiences",
//       "5000 monthly images",
//       "Standard support",
//       "Private Image Generator",
//       "Unlimited Images",
//     ],
//     button: "Start Free Trial",
//   },
//   {
//     type: "Pro Plan",
//     price: "899$",
//     duration: "per Month",
//     features: [
//       "Ad Free Experiences",
//       "5000 monthly images",
//       "Standard support",
//       "Private Image Generator",
//       "Unlimited Images",
//     ],
//     button: "Contact For More Information",
//   },
//   {
//     type: "premium plan",
//     price: "1199$",
//     duration: "per Month",
//     features: [
//       "Ad Free Experiences",
//       "5000 monthly images",
//       "Standard support",
//       "Private Image Generator",
//       "Unlimited Images",
//     ],
//     button: "Contact For More Information",
//   },
//   {
//     type: "Enterprise plan",
//     price: "13,991$",
//     duration: "per Annum",
//     features: [
//       "Ad Free Experiences",
//       "5000 monthly images",
//       "Standard support",
//       "Private Image Generator",
//       "Unlimited Images",
//     ],
//     button: "Contact For More Information",
//   },
// ];
export default function Pricing() {
  const [plans, setPlans] = useState([]);
  const getPlanDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getPlans`,
      { headers: { authorization: token } }
    );

    console.log("plans", response.data);
    setPlans(response.data);
  };
  useEffect(() => {
    getPlanDetails();
  }, []);
  return (
    <div>
      <section className="pricing">
        <div className="container">
          <div className="row">
            {plans.map((pricing, index) => (
              <div
                key={pricing._id}
                className="col-lg-3 col-sm-6 col-md-6 animate__fadeInUp">
                <div className="card pricing-cards">
                  <div className="card-body pricing-card-body">
                    {index === 2 && (
                      <div className="most-popular-card">
                        <h5>Most Popular</h5>
                      </div>
                    )}
                    <h2 className="card-title">
                      {pricing.subscriptionPlanName}
                    </h2>
                    <h1 className="card-body-h1">
                      {pricing.price} <span>{pricing.duration}</span>
                    </h1>
                  </div>
                  <ul className="list-group list-group-flush pricing-ul">
                    {pricing.features.map((feature, idx) => (
                      <li key={idx} className="list-group-item">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          viewBox="0 -960 960 960"
                          width="20">
                          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary pricing-buttons">
                    {pricing.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
