import React from 'react'
const pricingData = [
    {
      type: "Free",
      price: "0$",
      duration: "30 days",
      features: [
        "Ad Free Experiences",
        "5000 monthly images",
        "Standard support",
        "Private Image Generator",
        "Unlimited Images",
      ],
      button: "Start Free Trial",
    },
    {
      type: "Basic",
      price: "899$",
      duration: "per Month",
      features: [
        "Ad Free Experiences",
        "5000 monthly images",
        "Standard support",
        "Private Image Generator",
        "Unlimited Images",
      ],
      button: "Contact For More Information",
    },
    {
      type: "Standard",
      price: "1199$",
      duration: "per Month",
      features: [
        "Ad Free Experiences",
        "5000 monthly images",
        "Standard support",
        "Private Image Generator",
        "Unlimited Images",
      ],
      button: "Contact For More Information",
    },
    {
      type: "Platinum",
      price: "13,991$",
      duration: "per Annum",
      features: [
        "Ad Free Experiences",
        "5000 monthly images",
        "Standard support",
        "Private Image Generator",
        "Unlimited Images",
      ],
      button: "Contact For More Information",
    },
  ];
const CustomerSubscription = () => {
  return (
    <div>
      <div>
      <section className="pricing">
        <div className="container">
          <div className="row">
            {pricingData.map((pricing, index) => (
              <div
                key={index}
                className="col-lg-3 col-sm-6 col-md-6 animate__fadeInUp">
                <div className="card pricing-cards">
                  <div className="card-body pricing-card-body">
                    {index === 2 && (
                      <div className="most-popular-card">
                        <h5>Most Popular</h5>
                      </div>
                    )}
                    <h2 className="card-title">{pricing.type}</h2>
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
    </div>
  )
}

export default CustomerSubscription
