import React from 'react'
import "./features.css"
import featuresicon1 from "../../images/Icon-1.png";
import featuresicon2 from "../../images/Icon-2.png";
import featuresicon3 from "../../images/Icon-3.png";
import featuresicon4 from "../../images/Icon-4.png";
export default function Features() {
  return (
    <div>
        <section class="features">
    <div class="container features-cards">
        <div class="row">
          
            <div class="col-lg-12">
                <h1> Features </h1>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
                <div class="card">
                <img src={featuresicon1} class="card-img-top features-icons-cards" alt="..."/>
                    <div class="card-body">
                      <h5 class="card-title card-title-name"> Effortless Comment Management </h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content up the bulk of the card's content.</p>
                
                        <button class="btn btn-primary learn-more"> Learn More </button>
                    </div>
                   
                    
                  </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
                <div class="card">
                <img src={featuresicon2} class="card-img-top features-icons-cards" alt="..."/>
                    <div class="card-body">
                      <h5 class="card-title card-title-name"> In-depth Comment Analysis </h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content up the bulk of the card's content.</p>
                  
                        <button class="btn btn-primary learn-more"> Learn More </button>
                    </div>
                   
                    
                  </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
                <div class="card">
                <img src={featuresicon3} class="card-img-top features-icons-cards" alt="..."/>
                    <div class="card-body">
                      <h5 class="card-title card-title-name"> Seamless Cross-Platform Posting </h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content up the bulk of the card's content.</p>
                    
                        <button class="btn btn-primary learn-more"> Learn More </button>
                    </div>
                   
                    
                  </div>
            </div>
            <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
                <div class="card">
                <img src={featuresicon4} class="card-img-top features-icons-cards" alt="..."/>
                    <div class="card-body">
                      <h5 class="card-title card-title-name"> Tailored Content Suggestions </h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content up the bulk of the card's content.</p>
                  
                        <button class="btn btn-primary learn-more"> Learn More </button>
                    </div>
                   </div>
                  </div>
             </div>
            </div>
            </section>
    </div>
  )
}
