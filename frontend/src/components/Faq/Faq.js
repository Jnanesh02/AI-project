
import React, { useState } from 'react';
import "./Faq.css";

export default function Faq() {
  const[name,setname]=useState("");
  const[nameerror,setnameerror]=useState("")
  const[email,setemail]=useState("");
  const[emailerror,setemailerror]=useState("");
  const[message,setmessage]=useState("");
  const[messageerror,setmessageerror]=useState("");

  const handleNameChange=(e)=>{
    setname(e.target.value);
     
  }
  const handleEmailchange=(e)=>{
setemail(e.target.value);
  }
  const handlemessagechange=(e)=>{
    setmessage(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(name.trim()===""){
      setnameerror("firstname is required");
      return;
    }
    alert("send request sucessfully")
    console.log("Name:",name);
    console.log("email:", email);
    console.log("message:",message);
  }
  return (
    <section className="faq">
      <div className="container">
        <h1 className="transition"> FAQ </h1>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="accordion" id="accordionExample">
              {faqItems.map((item, index) => (
                <div className="accordion-item faq-accordances" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                      <strong>{item.question}</strong>
                    </button>
                  </h2>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="make-your-questions">
              <form onSubmit={handleSubmit}>
                <input type="text" className="form-control mb-3" placeholder="Name" value={name} onChange={handleNameChange}/>
                {nameerror && <div className='Error'>{nameerror}</div>}
                <input type="text" className="form-control mb-3" placeholder="Email" value={email} onChange={handleEmailchange} required/>
                <textarea className="form-control mb-3" rows="3" placeholder="Write Something" value={message} onChange={handlemessagechange}></textarea>
                <button type="submit" className="btn btn-primary send-req"> SEND REQUEST </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  {
    question: "How does HypeSquad.ai improve my engagement with viewers?",
    answer: "HypeSquad.ai uses AI to analyze YouTube comments, enabling personalized responses, understanding viewer sentiments, and generating content ideas that resonate with your audience."
  },
  {
    question: "Can HypeSquad.ai help me understand my audience better?",
    answer: "Absolutely! Our sentiment analysis tools dive deep into comments to reveal what viewers truly feel about your content, offering invaluable insights into their preferences."
  },
  {
    question: "Will using HypeSquad.ai increase my channel's viewership and subscriber count?",
    answer: "While direct outcomes vary, our tools are designed to significantly enhance viewer satisfaction and engagement, which are critical factors in growing your viewership and subscriber base."
  },
  {
    question: "Is HypeSquad.ai suitable for new YouTubers?",
    answer: "Yes, our platform is user-friendly and beneficial for YouTubers at any stage of their career, providing tools to engage and grow your audience from the start."
  },
  {
    question: "How does the content ideas feature work?",
    answer: "By analyzing audience feedback and trends in your comments, HypeSquad.ai identifies topics and themes that your viewers are interested in, helping you to create more targeted and engaging content."
  }
  ,
  {
    question: "What makes HypeSquad.ai different from other engagement tools?",
    answer: "Our focus on leveraging AI for direct comment engagement, detailed sentiment analysis, and actionable content insights sets us apart, offering a comprehensive solution for YouTube influencers to deepen viewer relationships and optimize their content strategy"
  },
];
