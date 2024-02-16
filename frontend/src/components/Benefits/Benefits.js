// import React from 'react'
// import "./Benefits.css"
// import benefits from "../../images/benefits.png";
// export default function Benefits() {
//   return (
//     <div>
//         <section class="benefits">
//     <div class="container">
//         <div class="row">
//             <div class="col-lg-12">
//                 <h1 class="benefits-heading"> Benefits</h1>
//             </div>
//             <div class="col-lg-6 col-md-12 col-sm-12">
//               <div class="benefits-image">
//               <img src={benefits}/>
//             </div>
//             </div>
//             <div class="col-lg-6 col-md-12 col-sm-12 benefits-text">
//                 <p>
//                 Transform your YouTube influence with our cutting-edge trio: direct comment
// engagement, deep sentiment analysis, and strategic content insights. This
// powerhouse approach not only bonds you closer to your viewers but steers
// your creative journey with viewer-focused wisdom. Here's the magic unfold: 
//                 </p>
                   
//                 <p>
                   
//                 </p>
//                 <ul class="list-group">
//                     <li class="list-group-item">     
//                     <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                     Forge Deeper Bonds </li>
//                     <p>Personalize the connection, sparking community devotion.</p>
//                     <li class="list-group-item">
//                     <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                     Sharpen Your Creative Edge </li>
//                     <p>Shape your content around what your audience loves, boosting satisfaction and stickiness.</p>
//                     <li class="list-group-item"> 
//                      <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                      Unlock Growth Levers</li>
//                      <p>Pivot and perfect your content strategy with direct feedback, catapulting your engagement rates.</p>
//                     {/* <li class="list-group-item">
//                         <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                         Dynamic Adaptability </li>
//                     <li class="list-group-item"> 
//                         <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                         Enhanced Decisions Making Supports </li>
//                     <li class="list-group-item"> 
//                         <svg xmlns="http://www.w3.org/2000/svg" height="8" viewBox="0 -960 960 960" width="8"><path d="M480-46q-91 0-169.987-34.084-78.988-34.083-137.417-92.512T80.084-310.013Q46-389 46-480t34.084-169.987q34.083-78.988 92.512-137.417t137.417-92.512Q389-914 480-914t169.987 34.084q78.988 34.083 137.417 92.512t92.512 137.417Q914-571 914-480t-34.084 169.987q-34.083 78.988-92.512 137.417T649.987-80.084Q571-46 480-46Zm0-126q130 0 219-89t89-219q0-130-89-219t-219-89q-130 0-219 89t-89 219q0 130 89 219t219 89Zm0 0q-130 0-219-89t-89-219q0-130 89-219t219-89q130 0 219 89t89 219q0 130-89 219t-219 89Z"/></svg>
//                         Streamlined Workflow Integration </li> */}
//                   </ul>
//             </div>
//         </div>
//     </div>
//    </section>
//     </div>
//   )
// }
import React from 'react';
import "./Benefits.css";
import benefits from "../../images/benefits.png";

const Benefits = () => (
  <section className="benefits">
    <div className="container">
      <h1 className="benefits-heading">Benefits</h1>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="benefits-image">
            <img src={benefits} alt="Benefits" />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 benefits-text">
          <p>
            Transform your YouTube influence with our cutting-edge trio: direct comment engagement, deep sentiment analysis, and strategic content insights. This powerhouse approach not only bonds you closer to your viewers but steers your creative journey with viewer-focused wisdom. Here's the magic unfold:
          </p>
          <ul className="list-group">
            <li className="list-group-item">
             <strong> Forge Deeper Bonds</strong>
              <p>Personalize the connection, sparking community devotion.</p>
            </li>
            <li className="list-group-item">
              <strong>Sharpen Your Creative Edge</strong>
              <p>Shape your content around what your audience loves, boosting satisfaction and stickiness.</p>
            </li>
            <li className="list-group-item">
            <strong>  Unlock Growth Levers</strong>
              <p>Pivot and perfect your content strategy with direct feedback, catapulting your engagement rates.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Benefits;
