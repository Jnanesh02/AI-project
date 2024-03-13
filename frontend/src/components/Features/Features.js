// import React from 'react'
// import "./features.css"
// import featuresicon1 from "../../images/Icon-1.png";
// import featuresicon2 from "../../images/Icon-2.png";
// import featuresicon3 from "../../images/Icon-3.png";
// // import featuresicon4 from "../../images/Icon-4.png";
// export default function Features() {
//   return (
//     <div>
//         <section class="features">
//     <div class="container features-cards">
//         <div class="row">
          
//             <div class="col-lg-12">
//                 <h1> Features </h1>
//             </div>
//             <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
//                 <div class="card">
//                 <img src={featuresicon1} class="card-img-top features-icons-cards" alt="..."/>
//                     <div class="card-body">
//                       <h5 class="card-title card-title-name"> Engage with Precision </h5>
//                       <p class="card-text">Elevate your YouTube presence with
//                          personalized comment replies, crafting unique connections that
//                         resonate with your audience.</p>
                
//                         <button class="btn btn-primary learn-more"> Learn More </button>
//                     </div>
                   
                    
//                   </div>
//             </div>
//             <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
//                 <div class="card">
//                 <img src={featuresicon2} class="card-img-top features-icons-cards" alt="..."/>
//                     <div class="card-body">
//                       <h5 class="card-title card-title-name"> Insightful Sentiment Discovery </h5>
//                       <p class="card-text"> Dive deep into your viewers'
//                       emotions, unlocking engagement insights through nuanced sentiment
//                             analysis of YouTube comments.</p>
                  
//                         <button class="btn btn-primary learn-more"> Learn More </button>
//                     </div>
//                    </div>
//             </div>
            
//             <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
//                 <div class="card">
//                 <img src={featuresicon3} class="card-img-top features-icons-cards" alt="..."/>
//                     <div class="card-body">
//                       <h5 class="card-title card-title-name"> Strategic Content insights </h5>
//                       <p class="card-text">Harness the power of viewer feedback,
//                       refining your YouTube strategy to perfectly align with audience
//                        expectations and desires.</p>
                    
//                         <button class="btn btn-primary learn-more"> Learn More </button>
//                     </div>
                   
                    
//                   </div>
//             </div>
//             {/* <div class="col-lg-3 col-sm-6 col-md-6 features-main-card">
//                 <div class="card">
//                 <img src={featuresicon4} class="card-img-top features-icons-cards" alt="..."/>
//                     <div class="card-body">
//                       <h5 class="card-title card-title-name">Strategic Content insights </h5>
//                       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content up the bulk of the card's content.</p>
                  
//                         <button class="btn btn-primary learn-more"> Learn More </button>
//                     </div>
//                    </div>
//                   </div> */}
//              </div>
//             </div>
//             </section>
//     </div>
//   )
// }

import React from 'react';
import "./features.css";
import featuresicon1 from "../../images/Icon-1.png";
import featuresicon2 from "../../images/Icon-2.png";
import featuresicon3 from "../../images/Icon-3.png";

const Features = () => (
  <section className="features">
    <div className="container features-cards">
      <h1 className='transition'>Features</h1>
      <div className="row">
        {[{ icon: featuresicon1, title: "Engage with Precision", text: "Elevate your YouTube presence with personalized comment replies, crafting unique connections that resonate with your audience." },
          { icon: featuresicon2, title: "Insightful Sentiment Discovery", text: "Dive deep into your viewers' emotions, unlocking engagement insights through nuanced sentiment analysis of YouTube comments." },
          { icon: featuresicon3, title: "Strategic Content insights", text: "Harness the power of viewer feedback, refining your YouTube strategy to perfectly align with audience expectations and desires." }].map((feature, index) => (
            <div key={index} className="col-lg-3 col-sm-6 col-md-6 features-main-card">
              <div className="card">
                <img src={feature.icon} className="card-img-top features-icons-cards" alt="..." />
                <div className="card-body">
                  <h5 className="card-title card-title-name">{feature.title}</h5>
                  <p className="card-text">{feature.text}</p>
                  <button className="btn btn-primary learn-more">Learn More</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  </section>
);

export default Features;

